const fs = require('fs');
const gaze = require('gaze');

const logger        = require('../log/log');

function loadMappings(config, mappings) {
    let count = 0;

    let storageConfig = config.storage;

    let mappingsDir;
    if (storageConfig.engine == 'fs') {
        mappingsDir = storageConfig.mappings;
        if (Array.isArray(mappingsDir)) {
            mappingsDir.forEach(function(value, index) {
                var dir = process.cwd() + '/' + value;

                var mappingFiles = fs.readdirSync(dir);

                // Read js file only.
                var dataFiles = mappingFiles.filter((f) => {
                    return f.endsWith('.js');
                });

                for (var file of dataFiles) {
                    count += parseMapping(dir + "/" + file, mappings);
                }
            });
        }

        watchMappings(mappingsDir, mappings);
    }

    return count;
}

function parseMapping(filepath, mappings) {
    let count = 0;
    let data = require(filepath);
    if (data.mappings) {
        for (let url in data.mappings) {
            mappings[url] = data.mappings[url];
            if (!(data.mappings[url].state)) {
                mappings[url].state = 'success';
            }
            if (data.mappings[url].count == undefined) {
                mappings[url].count = 1;
            }
            count++;
        }
    }

    return count;
}

function removeMapping(filepath, mappings) {
    let count = 0;
    let data = require(filepath);
    if (data.mappings) {
        for (let url in data.mappings) {
            delete mappings[url];
            count++;
        }
    }

    return count;
}

function watchMappings(mappingsDir, mappings) {
    // Watch all .js files/dirs in process.cwd()
    gaze(mappingsDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseMapping(filepath, mappings);
            logger.info('%s mappings are reloaded.', count);
        });

        // On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseMapping(filepath, mappings);
            logger.info('%s new mappings are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeMapping(filepath, mappings);
            logger.info('%s mappings are removed.', count);
        });
    });
}

module.exports = {
    "loadMappings": loadMappings
}

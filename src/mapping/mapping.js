const fs = require('fs');
const gaze = require('gaze');

const logger        = require('../log/log');

let _mappings  = {};		//store mappings

function loadMappings(config) {
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
                    count += parseMapping(dir + "/" + file);
                }
            });
        }

        watchMappings(mappingsDir);
    }

    return count;
}

function parseMapping(filepath) {
    let count = 0;
    let data = require(filepath);
    if (data.mappings) {
        for (let url in data.mappings) {
            let method = data.mappings["method"];
            if(!method) {
                method = "GET";
            }else{
                method = method.toUpperCase();
            }

            let mapping = data.mappings[url];
            if (!(mapping.state)) {
                mapping.state = 'success';
            }
            if (mapping.count == undefined) {
                mapping.count = 1;
            }
            if(!_mappings[url]) {
                _mappings[url] = {};
            }
            _mappings[url][method] = mapping;
            count++;
        }
    }

    return count;
}

function removeMapping(filepath) {
    let count = 0;
    let data = require(filepath);
    if (data.mappings) {
        for (let url in data.mappings) {
            let method = data.mappings["method"];
            if(!method) {
                method = "GET";
            }else{
                method = method.toUpperCase();
            }
            if(_mappings[url] && _mappings[url][method]) {
                delete _mappings[url][method];
            }
            count++;
        }
    }

    return count;
}

function watchMappings(mappingsDir) {
    // Watch all .js files/dirs in process.cwd()
    gaze(mappingsDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseMapping(filepath);
            logger.info('%s mappings are reloaded.', count);
        });

        // On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseMapping(filepath);
            logger.info('%s new mappings are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeMapping(filepath);
            logger.info('%s mappings are removed.', count);
        });
    });
}

function getMappings() {
    return _mappings;
}

function setMappings(mappings) {
    _mappings = mappings;
}

module.exports = {
    "loadMappings": loadMappings,
    "getMappings": getMappings
}

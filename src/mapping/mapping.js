const fs = require('fs');
const gaze = require('gaze');

const logger        = require('../log/log');
const mappingMysqlDao    = require('./mysql/mapping.dao');

let _mappings  = {};		//store mappings

function loadMappings(config) {
    logger.info("Loading mappings ... ");
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
    }else if(storageConfig.engine == 'mysql'){
        mappingMysqlDao.findAll().then(function(mappings){
            count = mappings.length;
            for(let i=0; i<mappings.length; i++) {
                var dbMapping = JSON.parse(JSON.stringify(mappings[i]));
                let mapping = {};
                let method;
                mapping.url = dbMapping.url;
                mapping.dataKey = dbMapping.dataKey;
                mapping.type = dbMapping.type;
                if(dbMapping.method) {
                    mapping.method = dbMapping.method.toUpperCase();
                    method = dbMapping.method.toUpperCase();
                }else{
                    mapping.method = 'GET';
                    method = 'GET';
                }
                if (!(dbMapping.state)) {
                    mapping.state = 'success';
                }
                if (dbMapping.count == undefined) {
                    mapping.count = 1;
                }
                if(dbMapping.wrapper) {
                    mapping.wrapper = JSON.parse(dbMapping.wrapper);
                }
                if(!_mappings[mapping.url]) {
                    _mappings[mapping.url] = {};
                }
                _mappings[mapping.url][mapping.method] = mapping;
            }
            logger.info("%d mappings are loaded. ", count);
        });
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

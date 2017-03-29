const fs      = require('fs');
const gaze    = require('gaze');

const logger  = require('tracer').colorConsole({level:'debug'});

function loadMappings(config, mappings) {
    let count = 0;

    let storageConfig = config.storage;

	let mappingsDir;
	if(storageConfig.engine == 'fs') {
		mappingsDir = storageConfig.mappings;
		if(Array.isArray(mappingsDir)){
			mappingsDir.forEach(function(value, index){
				var dir = process.cwd() + '/' + value;

				var mappingFiles = fs.readdirSync(dir);

				// Read js file only.
				var dataFiles = mappingFiles.filter((f)=>{
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
    if(data.mappings) {
        logger.debug("-------------------");
        logger.debug(data.mappings);
        logger.debug("-------------------");
        for(let url in data.mappings) {
            mappings[url] = data.mappings[url];
            if(!(data.mappings[url].state)) {
                mappings[url].state = 'success';
            }
            if(data.mappings[url].count == undefined) {
                mappings[url].count = 1;
            }
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
            logger.debug("*********************************");
            logger.debug(mappings);

            logger.debug('%s was changed', filepath);
            let count = parseMapping(filepath, mappings);
            logger.info('%s mappings are reloaded.', count);

            logger.debug(mappings);
            logger.debug("*********************************");
        });

      // On file added
      this.on('added', function(filepath) {
        logger.debug(filepath + ' was added');
      });

      // On file deleted
      this.on('deleted', function(filepath) {
        logger.debug(filepath + ' was deleted');
      });

      // On changed/added/deleted
      this.on('all', function(event, filepath) {
        logger.debug(filepath + ' was ' + event);
      });
    });
}

module.exports = {
    "loadMappings" : loadMappings
}

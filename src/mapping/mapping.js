const fs      = require('fs');

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
	}

    return count;
}

function parseMapping(filepath, mappings) {
    let count = 0;
    let data = require(filepath);
    if(data.mappings) {
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

module.exports = {
    "loadMappings" : loadMappings
}

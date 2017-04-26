const fs     = require('fs');
const gaze   = require('gaze');

const logger        = require('../log/log');

function loadDatas(config, dataSet) {
    let dataDefCount = 0;

    let storageConfig = config.storage;

	let datasDir;
	if(storageConfig.engine == 'fs') {
		datasDir = storageConfig.dataPath;
		if(Array.isArray(datasDir)){
			datasDir.forEach(function(value, index){
				var dir = process.cwd() + '/' + value;

				var datasFiles = fs.readdirSync(dir);

				// 过滤出.js文件:
				var dataFiles = datasFiles.filter((f)=>{
				    return f.endsWith('.js');
				});

				// 处理每个js文件:
				for (var file of dataFiles) {
					dataDefCount += parseDataSet(dir + "/" + file, dataSet);
				}
			});
		}
        watchDataSet(datasDir, dataSet);
	}

    return dataDefCount;
}

function parseDataSet(filepath, dataSet){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        dataSet[name] = data[name];
        count++;
    }
    return count;
}

function removeDataSet(filepath, dataSet){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        delete dataSet[name];
        count++;
    }
    return count;
}

function watchDataSet(dataDir, dataSet) {
    // Watch all .js files/dirs in process.cwd()
    gaze(dataDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseDataSet(filepath, dataSet);
            logger.info('%s data definitions are reloaded.', count);
        });

        //On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseDataSet(filepath, dataSet);
            logger.info('%s new mappings are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeDataSet(filepath, dataSet);
            logger.info('%s mappings are removed.', count);
        });
    });
}

module.exports = {
    "loadDatas" : loadDatas
}

const fs     = require('fs');
const gaze   = require('gaze');

const logger        = require('../log/log');
const dataSetDao    = require('./mysql/dataset.dao');

let _dataSet  = {};		//store data

function loadDatas(config) {
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
					dataDefCount += parseDataSet(dir + "/" + file);
				}
			});
		}
        watchDataSet(datasDir, _dataSet);
	}else if(storageConfig.engine == 'mysql'){
        dataSetDao.findAll().then(function(datasets){
            for(let i=0; i<datasets.length; i++) {
                console.log(JSON.parse(JSON.stringify(datasets[i])));
            }
        });
    }

    return dataDefCount;
}

function parseDataSet(filepath){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        _dataSet[name] = data[name];
        count++;
    }
    return count;
}

function removeDataSet(filepath){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        delete _dataSet[name];
        count++;
    }
    return count;
}

function watchDataSet(dataDir) {
    // Watch all .js files/dirs in process.cwd()
    gaze(dataDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseDataSet(filepath);
            logger.info('%s data definitions are reloaded.', count);
        });

        //On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseDataSet(filepath);
            logger.info('%s new mappings are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeDataSet(filepath);
            logger.info('%s mappings are removed.', count);
        });
    });
}

function getDataSet() {
    return _dataSet;
}

function setDataSet(dataSet) {
    _dataSet = dataSet;
}

module.exports = {
    "loadDatas" : loadDatas,
    "getDataSet": getDataSet,
    "setDataSet": setDataSet
}

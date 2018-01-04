const fs     = require('fs');
const gaze   = require('gaze');

const logger        = require('../log/log');
const dataSetMysqlDao    = require('./mysql/dataset.dao');

let _dataSet  = {};		//store data
let storageConfig;

function loadDatas(config) {
    logger.info("Loading defined datas ... ");
    let dataDefCount = 0;
    storageConfig = config.storage;
	if(storageConfig.engine == 'fs') {
        let datasDir;

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
        logger.info("%d data definitions are loaded. ", dataDefCount);
	}else if(storageConfig.engine == 'mysql'){
        dataSetMysqlDao.findAllWithDatas().then(function(datasets){
            dataDefCount = datasets.length;
            for(let i=0; i<datasets.length; i++) {
                var dbDataSet = JSON.parse(JSON.stringify(datasets[i]));
                var data = {};
                if(datasets[i].datas && datasets[i].datas.length > 0) {
                    for(let j=0; j<datasets[i].datas.length; j++) {
                        var dbDataSetData = datasets[i].datas[j];
                        data[dbDataSetData.state] = JSON.parse(dbDataSetData.data);
                    }
                }
                _dataSet[dbDataSet.name] = data;
            }
            logger.info("%d data definitions are loaded. ", dataDefCount);
        });
    }
};

function saveData(data, oldDataKey) {
    if(storageConfig && storageConfig.engine == 'mysql') {
        if(oldDataKey) {
            
        }else{
            let dataInfo = {name : data.name};
            dataSetMysqlDao.sequelize.transaction(function(t){
                 dataSetMysqlDao.insertDataInfo(dataInfo, {transaction : t}).then(function(savedDataInfo){
                     let datasetId = savedDataInfo.id;
                     let datasetData = {
                         datasetId : datasetId,

                     }
                 });
            });
        }
    }
};

function parseDataSet(filepath){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        _dataSet[name] = data[name];
        count++;
    }
    return count;
};

function removeDataSet(filepath){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        delete _dataSet[name];
        count++;
    }
    return count;
};

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
};

function getDataSet() {
    return _dataSet;
};

function setDataSet(dataSet) {
    _dataSet = dataSet;
};

module.exports = {
    "loadDatas" : loadDatas,
    "getDataSet": getDataSet,
    "setDataSet": setDataSet
}

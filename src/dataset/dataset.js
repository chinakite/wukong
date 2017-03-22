const fs = require('fs');

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
					let data = require(dir + '/' + file);
					for(let name in data) {
						dataSet[name] = data[name];
                        dataDefCount++;
					}
				}
			});
		}
	}

    return dataDefCount;
}

module.exports = {
    "loadDatas" : loadDatas
}

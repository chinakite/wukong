const fs         = require('fs');

const ruleEngine = require('../rule/rule.engine');

function loadTemplates(config, tmplSet) {
    let tmplCount = 0;

    let storageConfig = config.storage;

	let tmplsDir;
	if(storageConfig.engine == 'fs') {
		tmplsDir = storageConfig.tmplPath;
		if(Array.isArray(tmplsDir)){
			tmplsDir.forEach(function(value, index){
				var dir = process.cwd() + '/' + value;

				var files = fs.readdirSync(dir);

				// 过滤出.js文件:
				var tmplFiles = files.filter((f)=>{
				    return f.endsWith('.js');
				});

				// 处理每个js文件:
				for (var file of tmplFiles) {
					let data = require(dir + '/' + file);
					for(let name in data) {
						var tmplDef = data[name];
						var tmplDesc = {};
						for(var prop in tmplDef) {
							var ruleExpr = tmplDef[prop];
							tmplDesc[prop] = ruleEngine.parseRule(ruleExpr);
						}
						tmplSet[name] = tmplDesc;
                        tmplCount++;
					}
				}
			});
		}
	}

    return tmplCount;
}

module.exports = {
    "loadTemplates" : loadTemplates
}

const fs         = require('fs');
const gaze       = require('gaze');

const ruleEngine = require('../rule/rule.engine');
const ruleParser = require("../rule/rule.parser");

const logger        = require('../log/log');

let _tmplSet  = {};		//store templates

function loadTemplates(config) {
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
                    tmplCount += parseTemplates(dir + '/' + file, _tmplSet);
				}
			});
		}

        watchTemplates(tmplsDir, _tmplSet);
	}

    return tmplCount;
}

function parseTemplates(filepath) {
    let count = 0;

    let data = require(filepath);
    for(let name in data) {
        let tmplDef = data[name];
        let tmplDesc = ruleParser.parseDataTmpl(tmplDef);
        _tmplSet[name] = tmplDesc;
        count++;
    }

    return count;
}

function removeTemplates(filepath){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        delete _tmplSet[name];
        count++;
    }
    return count;
}

function watchTemplates(tmplsDir) {
    // Watch all .js files/dirs in process.cwd()
    gaze(tmplsDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseTemplates(filepath, _tmplSet);
            logger.info('%s templates are reloaded.', count);
        });

        //On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseTemplates(filepath, _tmplSet);
            logger.info('%s new templates are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeTemplates(filepath, _tmplSet);
            logger.info('%s templates are removed.', count);
        });
    });
}

function getTmplSet() {
    return _tmplSet;
}

function setTmplSet(tmplSet) {
    _tmplSet = tmplSet;
}

module.exports = {
    "loadTemplates" : loadTemplates,
    "getTmplSet" : getTmplSet,
    "setTmplSet" : setTmplSet
}

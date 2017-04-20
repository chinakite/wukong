const fs         = require('fs');
const gaze       = require('gaze');

const ruleEngine = require('../rule/rule.engine');
const ruleParser = require("../rule/rule.parser");

const logger = require('tracer').colorConsole({
    level: 'debug'
});

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
                    tmplCount += parseTemplates(dir + '/' + file, tmplSet);
				}
			});
		}

        watchTemplates(tmplsDir, tmplSet);
	}

    return tmplCount;
}

function parseTemplates(filepath, tmplSet) {
    let count = 0;

    let data = require(filepath);
    for(let name in data) {
        let tmplDef = data[name];
        let tmplDesc = ruleParser.parseDataTmpl(tmplDef);
        tmplSet[name] = tmplDesc;
        count++;
    }

    return count;
}

function removeTemplates(filepath, tmplSet){
    let count = 0;
    let data = require(filepath);
    for(let name in data) {
        delete tmplSet[name];
        count++;
    }
    return count;
}

function watchTemplates(tmplsDir, tmplSet) {
    // Watch all .js files/dirs in process.cwd()
    gaze(tmplsDir + '/**/*.js', function(err, watcher) {
        // On file changed
        this.on('changed', function(filepath) {
            delete require.cache[require.resolve(filepath)];

            logger.debug('%s was changed', filepath);
            let count = parseTemplates(filepath, tmplSet);
            logger.info('%s templates are reloaded.', count);
        });

        //On file added
        this.on('added', function(filepath) {
            logger.debug('%s was added.', filepath);
            let count = parseTemplates(filepath, tmplSet);
            logger.info('%s new templates are loaded.', count);
        });

        // On file deleted
        this.on('deleted', function(filepath) {
            logger.debug('%s was deleted.', filepath);
            let count = removeTemplates(filepath, tmplSet);
            logger.info('%s templates are removed.', count);
        });
    });
}

module.exports = {
    "loadTemplates" : loadTemplates
}

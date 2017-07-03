const logger        = require('../../log/log');
const config        = require('../../../wukong.config');

const fs            = require('fs');

let libMgr = async (ctx, next) => {
    ctx.render('library/library.html', {});
};

let globalLibs = async (ctx, next) => {
    logger.debug("GET /__man__/globallibs");
    let result = [];
    let libPath = config.storage.libPath;
    if(libPath instanceof Array) {
        for(let i=0; i<libPath.length; i++) {
            readLibFiles(libPath[i], result);
        }
    }else{
        readLibFiles(libPath, result);
    }

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + result);
	ctx.response.body = result;
};

let myLibs = async (ctx, next) => {
    logger.debug("GET /__man__/mylibs");

    let result = [];
    let libPath = config.storage.mylibPath;
    if(libPath instanceof Array) {
        for(let i=0; i<libPath.length; i++) {
            readLibFiles(libPath[i], result);
        }
    }else{
        readLibFiles(libPath, result);
    }

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + result);
	ctx.response.body = result;
};

let readLibFiles = function(libPath, result) {
    let files = fs.readdirSync(libPath);
    files.forEach(function(file){
        let pathName = libPath + '/' + file;
        let stat = fs.lstatSync(pathName);
        if (!stat.isDirectory()){
            result.push({"name" : file.replace('.wk72', '')});
        }
    });
}

module.exports = {
    'GET /__man__/libmgr' : libMgr,
    'GET /__man__/globallibs' : globalLibs,
    'GET /__man__/mylibs' : myLibs
};

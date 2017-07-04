const logger        = require('../../log/log');
const config        = require('../../../wukong.config');
const Base64        = require('js-base64').Base64;

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

let loadGlobalLib = async (ctx, next) => {
    logger.debug("GET /__man__/globallib/:name entry");

    let libPath = config.storage.libPath;
    let name = ctx.params.name;
	name = Base64.decode(name);
    let filePath = libPath + "/" + name + ".wk72";
    let result = readLibFile(filePath);

	ctx.response.set({
		"Content-Type": "text/html",
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

let loadMyLib = async (ctx, next) => {
    logger.debug("GET /__man__/mylib/:name entry");

    let libPath = config.storage.mylibPath;
    let name = ctx.params.name;
	name = Base64.decode(name);
    let filePath = libPath + "/" + name + ".wk72";
    let result = readLibFile(filePath);

	ctx.response.set({
		"Content-Type": "text/html",
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

let readLibFile = function(filePath) {
    return fs.readFileSync(filePath).toString();
}

module.exports = {
    'GET /__man__/libmgr' : libMgr,
    'GET /__man__/globallibs' : globalLibs,
    'GET /__man__/globallib/:name' : loadGlobalLib,
    'GET /__man__/mylibs' : myLibs,
    'GET /__man__/mylib/:name' : loadMyLib
};

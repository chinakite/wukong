const config = {
    port : 7272,
    storage : {
		engine : 'fs',
		mappings  : ['data/mappings'],
		dataPath  : ['data/datas'],
		tmplPath  : ['data/tmpls'],
        libPath   : ['data/lib'],
        mylibPath : ['data/lib/my']
	},
    log : {
        level : 'debug'
    }
};

module.exports = config;

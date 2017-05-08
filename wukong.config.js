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
    },
    swagger : {
        enabled : true,
        apis : [
            "http://localhost:8080/v2/api-docs"
        ]
    }
};

module.exports = config;

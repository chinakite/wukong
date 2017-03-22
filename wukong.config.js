const config = {
    port : 7272,
    storage : {
		engine : 'fs',
		mappings : ['data/mappings'],
		dataPath : ['data/datas'],
		tmplPath : ['data/tmpls']
	}
};

module.exports = config;

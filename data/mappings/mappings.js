var mappings = {
		'/modules' : {
			type : 'data',
			dataKey : 'modules',
			count: 1,
			wrapper : {
				success : {"code": 200, "data": "@respData"}
			}
		},
		'/funcs' : {
			type : 'tmpl',
			dataKey : 'func',
			count : 2,
			wrapper : {
				success : {"code": 200, "data": "@respData"}
			}
		},
		'/menus' : {
			type : 'data',
			dataKey : 'menus'
		}
    };

module.exports = {
	"mappings": mappings
}

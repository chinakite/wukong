var mappings = [
	{
		'/modules' : {
			type : 'data',
			dataKey : 'modules'
		}
    },
    {
    	'/funcs' : {
			type : 'tmpl',
			dataKey : 'func',
			count : 10,
			wrapper : {
				success : {"code": 200, "data": "@respData"}
			}
		}
    }
];

module.exports = {
	"mappings": mappings
}

var func = {
	id   : 'int|1000+1',
	code : 'string|regex|/[a-zA-Z]{10}/',
	isShow : 'boolean|random',
	birth : "date|today|#yyyy/MM/dd",
	created : "datetime|now",
	openTime : "time|now",
	role : "string|'超级管理员'",
	like : "string|my|display_monitor_brand",
	real : "float|0.5+0.02",
	children: "array|@funcChildren|5"
}

var funcChildren = {
	id : 'int|100+1',
	name : "string|regex|/[a-zA-Z]{4}/"
}

module.exports = {
	'func' : func,
	'funcChildren': funcChildren
}

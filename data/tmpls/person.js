var persons = {
	id      : "int|100+1",
	name    : "string|'AAA'",
	birth   : "date|'1981-01-01'",
	created : "datetime|now",
	email   : "string|'BBB'",
	address : [
		{province:"string|'Beijing'", city : "string|'Beijing'"},
		{province:"string|'Hebei'", city : "string|'Shijiazhuang'"}
	],
	parent  : "object|@parent"
}

var personCount = "int|[100,200,300]";

var parent = {
	id      : "int|1000+1",
	name    : "string|'PPP'"
}

var aperson = {
	id : "request|param|id",
	name : "string|'WUKONG'"
}

module.exports = {
	'persons' : persons,
	'personCount' : personCount,
	'parent' : parent,
	"aperson": aperson
}

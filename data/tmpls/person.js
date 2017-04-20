var persons = {
	id      : "int|100+1",
	name    : "string|'AAA'",
	birth   : "date|'1981-01-01'",
	created : "datetime|now",
	email   : "string|'BBB'"
}

var personCount = "int|[100,200,300]";

module.exports = {
	'persons' : persons,
	'personCount' : personCount
}

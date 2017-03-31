var modules = {
	"success" : [
		{id: 1, name:"控制台", code:"console", protocol:"http", domain:"console.ecc.com", port:"18333", created:'2017-03-08 00:00:00', creator:'1', modified:'2017-03-08 00:00:00', modifier:'1'},
		{id: 2, name:"服务中心", code:"service-center", protocol:"http", domain:"sc.ecc.com", port:"18222", created:'2017-03-08 00:00:00', creator:'1', modified:'2017-03-08 00:00:00', modifier:'1'}
	],
	"error" : {
		code : "0200-ERROR", msg : "There are some errors occured."
	}
}

module.exports = {
	"modules": modules
}

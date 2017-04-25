var intGen = require('./generator.int');
var boolGen = require('./generator.boolean');
var stringGen = require('./generator.string');
var dateGen = require('./generator.date');
var datetimeGen = require('./generator.datetime');
var timeGen = require('./generator.time');
var floatGen = require('./generator.float');
var objectGen = require('./generator.object');
var arrayGen = require('./generator.array');
var reqGen = require('./generator.request');

//TODO extends Default Options
let   logOption    = {level: 'debug'};
const logger        = require('tracer').colorConsole(logOption);

function generate(tmpl, count, config, ctx) {
	return new Promise(async function(resolve, reject){
		if(tmpl) {
			var dataType = tmpl['dataType'];
			var result;
			if(dataType == 'array') {
				result = await arrayGen.generate(tmpl.desc, 1, config, ctx);
			}else if(dataType == 'object') {
				result = await objectGen.generate(tmpl.desc, count, config, ctx);
			}else if(dataType == 'int') {
				result = intGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'boolean'){
				result = boolGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'string'){
				result = await stringGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'date'){
				result = dateGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'datetime'){
				result = datetimeGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'time'){
				result = timeGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'float'){
				result = floatGen.generate(tmpl.desc, count, config);
			}else if(dataType == 'request') {
				result = reqGen.generate(tmpl.desc, count, config, ctx);
			}

			resolve(result);
		}else{
			reject("Can not found data template");
		}
	});
}

module.exports.__proto__ = {
	"generate" : generate
}

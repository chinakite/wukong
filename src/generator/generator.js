var intGen = require('./generator.int');
var boolGen = require('./generator.boolean');
var stringGen = require('./generator.string');
var dateGen = require('./generator.date');
var datetimeGen = require('./generator.datetime');
var timeGen = require('./generator.time');
var floatGen = require('./generator.float');
var objectGen = require('./generator.object');

function generate(tmpl, count, config) {
	return new Promise(async function(resolve, reject){
		if(tmpl) {
			var dataType = tmpl['dataType'];
			var result;
			if(dataType == 'array') {

			}else if(dataType == 'object') {
				result = objectGen.generate(tmpl.desc, count, config);
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
			}

			resolve(result);
		}else{
			reject("Can not found data template");
		}

/*
		if(!count) {
			count = 1;
		}
		var result;
		if(count == 1) {
			result = {};
		}else{
			result = [];
		}
		if(tmpl) {
			var dataCache = {};
			for(var prop in tmpl) {
				var ruleDesc = tmpl[prop];
				if(ruleDesc.dataType == 'int') {
					dataCache[prop] = intGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'boolean'){
					dataCache[prop] = boolGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'string'){
					dataCache[prop] = await stringGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'date'){
					dataCache[prop] = dateGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'datetime'){
					dataCache[prop] = datetimeGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'time'){
					dataCache[prop] = timeGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'float'){
					dataCache[prop] = floatGen.generate(ruleDesc.desc, count, config);
				}else if(ruleDesc.dataType == 'object'){
					dataCache[prop] = objectGen.generate(ruleDesc.desc, count, config);
				}
			}
			if(count == 1) {
				result = dataCache;
			}else{
				for(var i=0; i<count; i++) {
					var data = {};
					for(var prop in tmpl) {
						data[prop] = dataCache[prop][i];
					}
					result.push(data);
				}
			}
			resolve(result);
		}else{
			reject("Can not found data template");
		}
*/
	});
}

module.exports = {
	"generate" : generate
}

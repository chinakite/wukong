var intGen = require('./generator.int');
var boolGen = require('./generator.boolean');
var stringGen = require('./generator.string');
var dateGen = require('./generator.date');
var datetimeGen = require('./generator.datetime');
var timeGen = require('./generator.time');

function generate(tmpl, count, config) {
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
				dataCache[prop] = stringGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'date'){
				dataCache[prop] = dateGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'datetime'){
				dataCache[prop] = datetimeGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'time'){
				dataCache[prop] = timeGen.generate(ruleDesc.desc, count, config);
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
		return result;
	}else{
		throw "Can not found data template";
	}
}

module.exports = {
	"generate" : generate
}

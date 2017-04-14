var intGen = require('./generator.int');
var boolGen = require('./generator.boolean');
var stringGen = require('./generator.string');
var dateGen = require('./generator.date');
var datetimeGen = require('./generator.datetime');
var timeGen = require('./generator.time');
var floatGen = require('./generator.float');

function generate(objectRuleDesc, count, config) {
	if(!count) count = 1;
	let refDesc = objectRuleDesc.refDesc;
	if(refDesc) {
		if(count == 1) {
			return true;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(true);
			}
			return result;
		}
	}else{
		let data = {};
		for(var prop in objectRuleDesc) {
			var ruleDesc = tmpl[prop];
			if(ruleDesc.dataType == 'int') {
				data[prop] = intGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'boolean'){
				data[prop] = boolGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'string'){
				data[prop] = await stringGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'date'){
				data[prop] = dateGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'datetime'){
				data[prop] = datetimeGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'time'){
				data[prop] = timeGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'float'){
				data[prop] = floatGen.generate(ruleDesc.desc, count, config);
			}else if(ruleDesc.dataType == 'object'){
				data[prop] = objectGen.generate(ruleDesc.desc, count, config);
			}
		}
	}
}

module.exports = {
	"generate" : generate
}

const template      = require('../template/template');

let intGen = require('./generator.int');
let boolGen = require('./generator.boolean');
let stringGen = require('./generator.string');
let dateGen = require('./generator.date');
let datetimeGen = require('./generator.datetime');
let timeGen = require('./generator.time');
let floatGen = require('./generator.float');
let arrayGen = require('./generator.array');
let reqGen = require('./generator.request');

//TODO extends Default Options
let   logOption    = {level: 'debug'};
const logger        = require('tracer').colorConsole(logOption);

function generate(objectRuleDesc, count, config, ctx) {
	return new Promise(async function(resolve, reject){
		if(!count && count < 1) count = 1;
		let result;
		if(count > 1) {
			result = [];
		}

		let refDesc = objectRuleDesc.refDesc;

		if(refDesc) {
			let tmplSet = template.getTmplSet();
			let refTmpl = tmplSet[refDesc];
			result = await generate(refTmpl.desc, count, config);
		}else{
			let dataCache = {};
			for(let prop in objectRuleDesc) {
				let ruleDesc = objectRuleDesc[prop];
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
					dataCache[prop] = await generate(ruleDesc.desc, count, config, ctx);
				}else if(ruleDesc.dataType == 'array') {
					dataCache[prop] = await arrayGen.generate(ruleDesc.desc, count, config, ctx);
				}else if(ruleDesc.dataType == 'request') {
					dataCache[prop] = await reqGen.generate(ruleDesc.desc, count, config, ctx);
				}
			}

			if(count == 1) {
				result = dataCache;
			}else{
				for(let i=0; i<count; i++) {
					let data = {};
					for(let prop in objectRuleDesc) {
						data[prop] = dataCache[prop][i];
					}
					result.push(data);
				}
			}
		}
		resolve(result);
	});
}

module.exports.__proto__ = {
	"generate" : generate
}

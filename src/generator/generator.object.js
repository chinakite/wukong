var intGen = require('./generator.int');
var boolGen = require('./generator.boolean');
var stringGen = require('./generator.string');
var dateGen = require('./generator.date');
var datetimeGen = require('./generator.datetime');
var timeGen = require('./generator.time');
var floatGen = require('./generator.float');

function generate(objectRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
		console.log("******* GEN Object start *********");
		if(!count && count < 1) count = 1;
		let result;
		if(count > 1) {
			result = [];
		}
		let refDesc = objectRuleDesc.refDesc;
		console.log("******* GEN Object refDesc *********");
		console.log(refDesc);
		if(refDesc) {
			// if(count == 1) {
			// 	return true;
			// }else{
			// 	let result = [];
			// 	for(var i=0; i<count; i++) {
			// 		result.push(true);
			// 	}
			// 	return result;
			// }
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
					//data[prop] = objectGen.generate(ruleDesc.desc, count, config);
				}
			}


			console.log("******* GEN Object dataCache *********  " + dataCache);

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
			console.log("******* GEN Object *********  " + result);
		}
		resolve(result);
	});

}

module.exports = {
	"generate" : generate
}

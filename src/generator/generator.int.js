var random = require("random-js")();

const logger        = require('../log/log');

function generate(intRuleDesc, count, config) {
	if(!count) count = 1;
	let policy = intRuleDesc.policy;
	if(policy == 'step') {
		if(count == 1) {
			return intRuleDesc.min;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				var n = intRuleDesc.min + (i*intRuleDesc.step);
				result.push(n);
			}
			return result;
		}
	}else{
		var dataset = intRuleDesc.dataset;
		if(dataset && dataset.length > 0) {
			if(count == 1) {
				return random.pick(dataset);
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					var n = random.pick(dataset);
					result.push(n);
				}
				return result;
			}
		}else{
			if(count == 1) {
				return random.integer(intRuleDesc.min, intRuleDesc.max);
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					var n = random.integer(intRuleDesc.min, intRuleDesc.max);
					result.push(n);
				}
				return result;
			}
		}
	}
}

module.exports = {
	"generate" : generate
}

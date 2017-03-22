var random = require("random-js")();
require('datejs');

function generate(datetimeRuleDesc, count) {
	if(!count) count = 1;
	let policy = datetimeRuleDesc.policy;
	if(policy == 'now') {
		if(count == 1) {
			return new Date().toString(datetimeRuleDesc.format);
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(new Date().toString(datetimeRuleDesc.format));
			}
			return result;
		}
	}else{
		var dataset = stringRuleDesc.dataset;
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
				return random.integer(stringRuleDesc.min, stringRuleDesc.max);
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					var n = random.integer(stringRuleDesc.min, stringRuleDesc.max);
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
var random = require("random-js")();
require('datejs');

function generate(dateRuleDesc, count, config) {
	if(!count) count = 1;
	let policy = dateRuleDesc.policy;
	if(policy == 'today'
			||  policy == 'now') {
		if(count == 1) {
			return Date.today().toString(dateRuleDesc.format);
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(Date.today().toString(dateRuleDesc.format));
			}
			return result;
		}
	}else if(policy == 'yesterday'
				||  policy == 'tomorrow'){
		if(count == 1) {
			return Date.parse(policy).toString(dateRuleDesc.format);
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(Date.parse(policy).toString(dateRuleDesc.format));
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

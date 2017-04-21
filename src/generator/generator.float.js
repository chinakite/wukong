var random = require("random-js")();

function generate(floatRuleDesc, count, config) {
	if(!count) count = 1;
	let policy = floatRuleDesc.policy;
	if(policy == 'step') {
		if(count == 1) {
			let n = floatRuleDesc.min.toFixed(floatRuleDesc.precision);
			return n;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				let n = floatRuleDesc.min + (i*floatRuleDesc.step);
				n = n.toFixed(floatRuleDesc.precision);
				result.push(n);
			}
			return result;
		}
	}else{
		var dataset = floatRuleDesc.dataset;
		if(dataset && dataset.length > 0) {
			if(count == 1) {
				let n = random.pick(dataset);
				n = n.toFixed(floatRuleDesc.precision);
				return random.pick(dataset);
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					let n = random.pick(dataset);
					n = n.toFixed(floatRuleDesc.precision);
					result.push(n);
				}
				return result;
			}
		}else{
			if(count == 1) {
				let n = random.real(floatRuleDesc.min, floatRuleDesc.max);
				n = n.toFixed(floatRuleDesc.precision);
				return n;
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					var n = random.real(floatRuleDesc.min, floatRuleDesc.max);
					n = n.toFixed(floatRuleDesc.precision);
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

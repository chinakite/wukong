var random = require("random-js")();

const logger        = require('../log/log');

function generate(boolRuleDesc, count, config) {
	if(!count) count = 1;
	let policy = boolRuleDesc.policy;
	if(policy == 'true') {
		if(count == 1) {
			return true;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(true);
			}
			return result;
		}
	}else if(policy == 'false') {
		if(count == 1) {
			return false;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(false);
			}
			return result;
		}
	}else if(policy == 'step') {
		if(count == 1) {
			return true;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				var n = (i%2 == 0);
				result.push(n);
			}
			return result;
		}
	}else{
		var dataset = [true, false];
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
	}
}

module.exports = {
	"generate" : generate
}

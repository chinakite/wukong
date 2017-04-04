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
		return null;
	}
}

module.exports = {
	"generate" : generate
}

const random  = require("random-js")();
const RandExp = require("randexp");

function generate(stringRuleDesc, count) {
	if(!count) count = 1;
	let policy = stringRuleDesc.policy;
	if(policy == 'regex') {
		if(count == 1) {
			var regexGen;
			if(stringRuleDesc.regexAttr) {
				regexGen = new RandExp(stringRuleDesc.regex, stringRuleDesc.regexAttr);
			}else{
				regexGen = new RandExp(stringRuleDesc.regex);
			}
			return regexGen.gen();
		}else{
			let result = [];
			var regexGen;
			if(stringRuleDesc.regexAttr) {
				regexGen = new RandExp(stringRuleDesc.regex, stringRuleDesc.regexAttr);
			}else{
				regexGen = new RandExp(stringRuleDesc.regex);
			}
			for(var i=0; i<count; i++) {
				var s = regexGen.gen();
				result.push(s);
			}
			return result;
		}
	}else if(policy == 'fixed'){
		if(count == 1) {
			return stringRuleDesc.value;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(stringRuleDesc.vallue);
			}
			return result;
		}
	}
}

module.exports = {
	"generate" : generate
}

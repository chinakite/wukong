const random   = require("random-js")();
const RandExp  = require("randexp");
const fileUtil = require("../util/file.util");

function generate(stringRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
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
				resolve(regexGen.gen());
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
				resolve(result);
			}
		}else if(policy == 'fixed'){
			if(count == 1) {
				return stringRuleDesc.value;
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					result.push(stringRuleDesc.value);
				}
				resolve(result);
			}
		}else if(policy == 'my') {
			let mypolicy = stringRuleDesc.mypolicy;
			let mylibPath = config.storage.mylibPath;
			let myfilePath = mylibPath + "/" + mypolicy + ".wk72";
			if(count == 1) {
				let randline = await fileUtil.randline(myfilePath);
				resolve(randline);
			}else{
				let result = [];
				for(var i=0; i<count; i++) {
					let randline = await fileUtil.randline(myfilePath);
					result.push(randline);
				}
				resolve(result);
			}
		}
	});
}

module.exports = {
	"generate" : generate
}

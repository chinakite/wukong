function generate(objectRuleDesc, count, config) {
	if(!count) count = 1;
	let refDesc = objectRuleDesc.refDesc;
	if(refDesc) {
        
		if(count == 1) {
			return true;
		}else{
			let result = [];
			for(var i=0; i<count; i++) {
				result.push(true);
			}
			return result;
		}
	}
}

module.exports = {
	"generate" : generate
}

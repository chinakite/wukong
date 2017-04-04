function parseRule(ruleItemStrs) {
	return parseObjectRule(ruleItemStrs);
}

function parseObjectRule(ruleItemStrs) {
	let objRuleDesc = new ObjectRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule.startsWith('@')) {
			objRuleDesc.refDesc = rule.substring(1, rule.length);
		}else{
			throw "Unexpected rule expression : " + rule;
		}
	}
	return objRuleDesc;
}

class ObjectRuleDesc {
    get refDesc() {
        return this._refDesc;
    }
    set refDesc(_refDesc) {
        this._refDesc = _refDesc;
    }
}

module.exports = {
	"parseRule" : parseRule
}

const REG_COUNT			= /^(\d+)$/g;

var regexUtil = require('../util/regex.util');

function parseRule(ruleItemStrs) {
	return parseArrayRule(ruleItemStrs);
}

function parseArrayRule(ruleItemStrs) {
	let arrRuleDesc = new ArrayRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule.startsWith('@')) {
			arrRuleDesc.refDesc = rule.substring(1, rule.length);
		}else if(regexUtil.regexFullMatch(rule, REG_COUNT)){
            arrRuleDesc.count = parseInt(rule);
        }else{
			throw "Unexpected rule expression : " + rule;
		}
	}
	return arrRuleDesc;
}

class ArrayRuleDesc {
    get refDesc() {
        return this._refDesc;
    }
    set refDesc(_refDesc) {
        this._refDesc = _refDesc;
    }

    get count() {
        return this._count;
    }
    set count(_count) {
        this._count = _count;
    }
}

module.exports = {
	"parseRule" : parseRule
}

const supportedPolicy = ['header', 'param', 'cookie', 'url', 'querystring', 'body'];

const logger        = require('../log/log');

function parseRule(ruleItemStrs) {
	return parseRequestRule(ruleItemStrs);
}

function parseRequestRule(ruleItemStrs) {
	let reqRuleDesc = new RequestRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];

        if(supportedPolicy.indexOf(rule.toLowerCase()) >= 0) {
            reqRuleDesc.policy = rule;
        }else{
            reqRuleDesc.attr = rule;
        }
	}
	return reqRuleDesc;
}

class RequestRuleDesc {
    get policy() {
        return this._policy;
    }
    set policy(_policy) {
        this._policy = _policy;
    }
	get attr() {
		return this._attr;
	}
	set attr(_attr) {
		this._attr = _attr;
	}
}

module.exports = {
	"parseRule" : parseRule
}

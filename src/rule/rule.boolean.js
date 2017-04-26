const BOOL_POLICY_STEP     = "step";
const BOOL_POLICY_RANDOM   = "random";
const BOOL_POLICY_TRUE     = "true";
const BOOL_POLICY_FALSE    = "false";

const logger        = require('../log/log');

function parseRule(ruleItemStrs) {
	return parseBooleanRule(ruleItemStrs);
}

function parseBooleanRule(ruleItemStrs) {
	let boolRuleDesc = new BoolRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == BOOL_POLICY_TRUE
				|| rule == BOOL_POLICY_FALSE
				|| rule == BOOL_POLICY_STEP
				|| rule == BOOL_POLICY_RANDOM) {
			boolRuleDesc.policy = rule;
		}else{
			throw "Unexpected rule expression : " + rule;
		}
	}
	if(!boolRuleDesc.policy) {
		boolRuleDesc.policy = BOOL_POLICY_RANDOM;
	}

	return boolRuleDesc;
}

class BoolRuleDesc {
	//Policy : random | step | count
    get policy() {
        return this._policy;
    }
    set policy(_policy) {
        this._policy = _policy;
    }
}

module.exports = {
	"parseRule" : parseRule
}

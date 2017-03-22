const REG_DATE_FORMAT 			= /\#.+$/g;

const DATE_POLICY_TODAY      = "today";
const DATE_POLICY_TOMORROW   = "tomorrow";
const DATE_POLICY_YESTERDAY  = "yesterday";
const DATE_POLICY_NOW        = "now";

const DATE_DEFAULT_FORMAT    = "yyyy-MM-dd";

var util = require('../util');

function parseRule(ruleItemStrs) {
	return parseDateRule(ruleItemStrs);
}

function parseDateRule(ruleItemStrs) {
	let dateRuleDesc = new DateRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == DATE_POLICY_TODAY
				|| rule == DATE_POLICY_NOW 
				|| rule == DATE_POLICY_YESTERDAY
				|| rule == DATE_POLICY_TOMORROW) {
			dateRuleDesc.policy = rule;
		}else{
			if(rule.startsWith("#")) {
				rule = rule.substring(1, rule.length);
				dateRuleDesc.format = rule;
			}else{
				//throw "Invalid expression item : " + rule;
			} 
		}
	}
	if(!dateRuleDesc.policy) {
		dateRuleDesc.policy = DATE_POLICY_TODAY;
	}
	if(!dateRuleDesc.format) {
		dateRuleDesc.format = DATE_DEFAULT_FORMAT;
	}

	return dateRuleDesc;
}

class DateRuleDesc {
	//Policy : random | step | count
    get policy() {
        return this._policy;
    }
    set policy(_policy) {
        this._policy = _policy;
    }

    get format() {
    	return this._format;
    }
    set format(_format) {
    	this._format = _format;
    }
}

module.exports = {
	"parseRule" : parseRule
}
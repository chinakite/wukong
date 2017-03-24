const REG_DATE_FORMAT 			= /\#.+$/g;

const DATETIME_POLICY_NOW        = "now";

const DATETIME_DEFAULT_FORMAT    = "yyyy-MM-dd HH:mm:ss";

function parseRule(ruleItemStrs) {
	return parseDatetimeRule(ruleItemStrs);
}

function parseDatetimeRule(ruleItemStrs) {
	let datetimeRuleDesc = new DatetimeRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == DATETIME_POLICY_NOW) {
			datetimeRuleDesc.policy = rule;
		}else{
			if(rule.startsWith("#")) {
				rule = rule.substring(1, rule.length);
				datetimeRuleDesc.format = rule;
			}else{
				//throw "Invalid expression item : " + rule;
			}
		}
	}
	if(!datetimeRuleDesc.policy) {
		datetimeRuleDesc.policy = DATETIME_POLICY_NOW;
	}
	if(!datetimeRuleDesc.format) {
		datetimeRuleDesc.format = DATETIME_DEFAULT_FORMAT;
	}

	return datetimeRuleDesc;
}

class DatetimeRuleDesc {
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

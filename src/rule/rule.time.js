const REG_DATE_FORMAT 			= /\#.+$/g;

const TIME_POLICY_NOW        = "now";

const TIME_DEFAULT_FORMAT    = "HH:mm:ss";

function parseRule(ruleItemStrs) {
	return parseTimeRule(ruleItemStrs);
}

function parseTimeRule(ruleItemStrs) {
	let timeRuleDesc = new TimeRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == TIME_POLICY_NOW ) {
			timeRuleDesc.policy = rule;
		}else{
			if(rule.startsWith("#")) {
				rule = rule.substring(1, rule.length);
				timeRuleDesc.format = rule;
			}else{
				//throw "Invalid expression item : " + rule;
			}
		}
	}
	if(!timeRuleDesc.policy) {
		timeRuleDesc.policy = TIME_POLICY_NOW;
	}
	if(!timeRuleDesc.format) {
		timeRuleDesc.format = TIME_DEFAULT_FORMAT;
	}

	return timeRuleDesc;
}

class TimeRuleDesc {
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

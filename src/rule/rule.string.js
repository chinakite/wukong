const REG_STRING_REGEX_EXPR  = /(\/.+\/)([im])?([im])?$/g;

const STRING_POLICY_NAME     = "name";
const STRING_POLICY_EMAIL    = "email";
const STRING_POLICY_CNAME    = "cname";
const STRING_POLICY_RANDOM   = "random";
const STRING_POLICY_REGEX    = "regex";
const STRING_POLICY_FIXED    = "fixed";

var util = require('../util');

function parseRule(ruleItemStrs) {
	return parseStringRule(ruleItemStrs);
}

function parseStringRule(ruleItemStrs) {
	let stringRuleDesc = new StringRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == STRING_POLICY_REGEX
				|| rule == STRING_POLICY_FIXED) {
			stringRuleDesc.policy = rule;
		}else{
			if(util.regexTest(rule, REG_STRING_REGEX_EXPR)) {		//Regex
				var matches = util.regexFullMatch(rule, REG_STRING_REGEX_EXPR);
				if(matches && matches.length > 0) {
					for(var j=0; j<matches.length; j++) {
						if(j == 0 && matches[j]) {
							stringRuleDesc.regex = matches[j].substring(1, matches[j].length-1);
						}else if(j > 0 && matches[j]) {
							if(!stringRuleDesc.regexAttr) {
								stringRuleDesc.regexAttr = matches[j];
							}else{
								stringRuleDesc.regexAttr += matches[j];
							}
						}
					}
				}
			}else if((rule.startsWith("\'") && rule.endsWith("\'"))
						|| (rule.startsWith("\"") && rule.endsWith("\""))) {
				stringRuleDesc.policy = STRING_POLICY_FIXED;
				if(rule.length == 2) {
					stringRuleDesc.value = '';
				}else{
					stringRuleDesc.value = rule.substring(1, rule.length - 1);
				}
			}
		}
	}
	if(!stringRuleDesc.policy) {
		stringRuleDesc.policy = STRING_POLICY_RANDOM;
	}

	return stringRuleDesc;
}

class StringRuleDesc {
	//Policy : random | step | count
    get policy() {
        return this._policy;
    }
    set policy(_policy) {
        this._policy = _policy;
    }

    //Min value
    get minLength() {
        return this._minLength;
    }
    set minLength(_minLength) {
        this._minLength = _minLength;
    }

    //Max value
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(_maxLength) {
        this._maxLength = _maxLength;
    }

    get value() {
    	return this._value;
    }
    set value(_value) {
    	this._value = _value;
    }

    get regex() {
    	return this._regex;
    }
    set regex(_regex) {
    	this._regex = _regex;
    }

    get regexAttr() {
    	return this._regexAttr;
    }
    set regexAttr(_regexAttr) {
    	this._regexAttr = _regexAttr;
    }
}

module.exports = {
	"parseRule" : parseRule
}

const REG_INT_NUM_STEP 			= /(\+|\-)(\d+)$/g;
const REG_INT_DUAL_NUM_STEP 	= /(\d+)(\+|\-|~)(\d+)$/g;
const REG_INT_ARRAY_LAST        = /(\d+)\]$/g;
const REG_INT_ARRAY_BEFORE_LAST = /(\d+)\,/g;
const REG_INT_NUM               = /\d+/g;

const INT_POLICY_STEP     = "step";
const INT_POLICY_RANDOM   = "random";

var regexUtil = require('../util/regex.util');

function parseRule(ruleItemStrs) {
	return parseIntRule(ruleItemStrs);
}


function parseIntRule(ruleItemStrs) {
	let intRuleDesc = new IntRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == INT_POLICY_STEP
				|| rule == INT_POLICY_RANDOM ) {
			intRuleDesc.policy = rule;
		}else{
			if(rule.startsWith("[") && rule.endsWith(']')) {
				var datas = regexUtil.regexFullMatch(rule, REG_INT_ARRAY_BEFORE_LAST);
				if(!datas) {
					datas = [];
				}
				var lastData = regexUtil.regexFullMatch(rule, REG_INT_ARRAY_LAST);
				if(lastData && lastData.length > 0) {
					datas.push(lastData);
				}
				if(datas.length == 0) {
					throw "Invalid array in Int Rule.";
				}else{
					intRuleDesc.dataset = datas;
				}
			}else{
				var dualNumMatches = regexUtil.regexFullMatch(rule, REG_INT_DUAL_NUM_STEP);
				var singleNumMatches = regexUtil.regexFullMatch(rule, REG_INT_NUM_STEP);
				if(dualNumMatches && dualNumMatches.length > 1){
					var op = dualNumMatches[1];
					if(op == '~') {
						intRuleDesc.min = parseInt(dualNumMatches[0]);
						intRuleDesc.max = parseInt(dualNumMatches[2]);
					}else if(op == '+') {
						intRuleDesc.policy = INT_POLICY_STEP;
						intRuleDesc.min = parseInt(dualNumMatches[0]);
						intRuleDesc.step = parseInt(dualNumMatches[2]);
					}else if(op == '-') {
						intRuleDesc.policy = INT_POLICY_STEP;
						intRuleDesc.max = parseInt(dualNumMatches[0]);
						intRuleDesc.step = (0-parseInt(dualNumMatches[2]));
					}
				}else if(singleNumMatches && singleNumMatches.length > 1){
					var op = dualNumMatches[0];
					if(op == '+') {
						intRuleDesc.policy = INT_POLICY_STEP;
						intRuleDesc.min = 0;
						intRuleDesc.step = parseInt(dualNumMatches[1]);
					}else if(op == '-') {
						intRuleDesc.policy = INT_POLICY_STEP;
						intRuleDesc.max = 0;
						intRuleDesc.step = (0-parseInt(dualNumMatches[1]));
					}
				}else{
					throw "Invalid expression item : " + rule;
				}
			}
		}
	}
	if(!intRuleDesc.policy) {
		intRuleDesc.policy = INT_POLICY_RANDOM;
	}

	return intRuleDesc;
}

class IntRuleDesc {
	//Policy : random | step | count
    get policy() {
        return this._policy;
    }
    set policy(_policy) {
        this._policy = _policy;
    }

    //Min value
    get min() {
        return this._min;
    }
    set min(_min) {
        this._min = _min;
    }

    //Max value
    get max() {
        return this._max;
    }
    set max(_max) {
        this._max = _max;
    }

    //step of step policy
    get step() {
        return this._step;
    }
    set step(_step) {
        this._step = _step;
    }

    get dataset() {
    	return this._dataset;
    }
    set dataset(_dataset) {
    	this._dataset = _dataset;
    }
}

module.exports = {
	"parseRule" : parseRule
}

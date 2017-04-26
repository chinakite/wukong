const REG_FLOAT_NUM_STEP 		  = /(\+|\-)(\d+\.\d+)$/g;
const REG_FLOAT_DUAL_NUM_STEP 	  = /(\d+\.\d+)(\+|\-|~)(\d+\.\d+)$/g;
const REG_FLOAT_ARRAY_LAST        = /(\d+\.\d+)\]$/g;
const REG_FLOAT_ARRAY_BEFORE_LAST = /(\d+\.\d+)\,/g;
const REG_FLOAT_NUM               = /\d+\.\d+/g;
const REG_FLOAT_PRECISION         = /^\.(\d+)/g;

const FLOAT_POLICY_STEP     = "step";
const FLOAT_POLICY_RANDOM   = "random";

const logger        = require('../log/log');

var regexUtil = require('../util/regex.util');

function parseRule(ruleItemStrs) {
	return parseFloatRule(ruleItemStrs);
}


function parseFloatRule(ruleItemStrs) {
	let floatRuleDesc = new FloatRuleDesc();
	for(let i=1; i<ruleItemStrs.length; i++) {
		let rule = ruleItemStrs[i];
		if(rule == FLOAT_POLICY_STEP
				|| rule == FLOAT_POLICY_RANDOM ) {
			floatRuleDesc.policy = rule;
		}else{
			if(rule.startsWith("[") && rule.endsWith(']')) {
				var datas = regexUtil.regexFullMatch(rule, REG_FLOAT_ARRAY_BEFORE_LAST);
				if(!datas) {
					datas = [];
				}
				var lastData = regexUtil.regexFullMatch(rule, REG_FLOAT_ARRAY_LAST);
				if(lastData && lastData.length > 0) {
					datas.push(lastData);
				}
				if(datas.length == 0) {
					throw "Invalid array in Int Rule.";
				}else{
					floatRuleDesc.dataset = datas;
				}
			}else{
				var dualNumMatches = regexUtil.regexFullMatch(rule, REG_FLOAT_DUAL_NUM_STEP);
				var singleNumMatches = regexUtil.regexFullMatch(rule, REG_FLOAT_NUM_STEP);
				var precisionMatches = regexUtil.regexFullMatch(rule, REG_FLOAT_PRECISION);
				if(dualNumMatches && dualNumMatches.length > 1){
					var op = dualNumMatches[1];
					if(op == '~') {
						floatRuleDesc.min = parseFloat(dualNumMatches[0]);
						floatRuleDesc.max = parseFloat(dualNumMatches[2]);
					}else if(op == '+') {
						floatRuleDesc.policy = FLOAT_POLICY_STEP;
						floatRuleDesc.min = parseFloat(dualNumMatches[0]);
						floatRuleDesc.step = parseFloat(dualNumMatches[2]);
					}else if(op == '-') {
						floatRuleDesc.policy = FLOAT_POLICY_STEP;
						floatRuleDesc.max = parseFloat(dualNumMatches[0]);
						floatRuleDesc.step = (0-parseFloat(dualNumMatches[2]));
					}
				}else if(singleNumMatches && singleNumMatches.length > 1){
					var op = dualNumMatches[0];
					if(op == '+') {
						floatRuleDesc.policy = FLOAT_POLICY_STEP;
						floatRuleDesc.min = 0;
						floatRuleDesc.step = parseFloat(dualNumMatches[1]);
					}else if(op == '-') {
						floatRuleDesc.policy = FLOAT_POLICY_STEP;
						floatRuleDesc.max = 0;
						floatRuleDesc.step = (0-parseFloat(dualNumMatches[1]));
					}
				}else if(precisionMatches && precisionMatches.length > 1){
					floatRuleDesc.precision = parseFloat(precisionMatches[1])
				}else{
					throw "Invalid expression item : " + rule;
				}
			}
		}
	}
	if(!floatRuleDesc.policy) {
		floatRuleDesc.policy = FLOAT_POLICY_RANDOM;
	}
	if(!floatRuleDesc.precision) {
		floatRuleDesc.precision = 2;
	}

	return floatRuleDesc;
}

class FloatRuleDesc {
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

	get precision() {
		return this._precision;
	}
	set precision(_precision) {
		this._precision = _precision;
	}
}

module.exports = {
	"parseRule" : parseRule
}

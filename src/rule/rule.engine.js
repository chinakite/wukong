const supportedDataType = ['int', 'string', 'boolean', 'bool', 'date', 'datetime', 'time', 'float', 'object'];

const logger        = require('../log/log');

let intRule = require("./rule.int");
let boolRule = require("./rule.boolean");
let stringRule = require("./rule.string");
let dateRule = require("./rule.date");
let datetimeRule = require("./rule.datetime");
let timeRule = require("./rule.time");
let floatRule = require('./rule.float');
let objectRule = require('./rule.object');

/*
 * int - min,max,start,step,random
 *
 *
 */
function parseRule(rule) {
	let ruleDesc = {};

	//rule = rule;
	let ruleItemStrs = rule.split('|');
	let dataType = ruleItemStrs[0];

	if(supportedDataType.indexOf(dataType) < 0) {
		console.log('Can not supported data type : ' + dataType);
	}else{
		ruleDesc.dataType = dataType;
	}

	if(ruleItemStrs.length > 1) {
		if(dataType == 'int') {
			var intRuleDesc = intRule.parseRule(ruleItemStrs);
			ruleDesc.desc = intRuleDesc;
		}else if(dataType == 'boolean' || dataType == 'bool') {
			var boolRuleDesc = boolRule.parseRule(ruleItemStrs);
			ruleDesc.desc = boolRuleDesc;
		}else if(dataType == 'string') {
			var stringRuleDesc = stringRule.parseRule(ruleItemStrs);
			ruleDesc.desc = stringRuleDesc;
		}else if(dataType == 'date') {
			var dateRuleDesc = dateRule.parseRule(ruleItemStrs);
			ruleDesc.desc = dateRuleDesc;
		}else if(dataType == 'datetime') {
			var datetimeRuleDesc = datetimeRule.parseRule(ruleItemStrs);
			ruleDesc.desc = datetimeRuleDesc;
		}else if(dataType == 'time') {
			var timeRuleDesc = timeRule.parseRule(ruleItemStrs);
			ruleDesc.desc = timeRuleDesc;
		}else if(dataType == 'float') {
			var floatRuleDesc = floatRule.parseRule(ruleItemStrs);
			ruleDesc.desc = floatRuleDesc;
		}else if(dataType == 'object') {
			var objectRuleDesc = objectRule.parseRule(ruleItemStrs);
			ruleDesc.desc = objectRuleDesc;
		}
	}
	return ruleDesc;
}

module.exports = {
	"parseRule" : parseRule
}

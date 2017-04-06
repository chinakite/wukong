const supportedDataType = ['int', 'string', 'boolean', 'bool', 'date', 'datetime', 'time', 'float', 'object'];

const util = require("../util/is.util");

const intRule = require("./rule.int");
const boolRule = require("./rule.boolean");
const stringRule = require("./rule.string");
const dateRule = require("./rule.date");
const datetimeRule = require("./rule.datetime");
const timeRule = require("./rule.time");
const floatRule = require('./rule.float');
const objectRule = require('./rule.object');

/*
 * int - min,max,start,step,random
 *
 *
 */
function parseDataTmpl(dataTmplDef) {
	var tmplDesc = {};
	for(let prop in dataTmplDef) {
		let rule = dataTmplDef[prop];
		let ruleDesc;
		if(util.isString(rule)) {
			ruleDesc = parseStringRule(rule);
		}else if(util.isArray(rule)) {

		}else{
			ruleDesc = {};
			ruleDesc['dataType'] = 'object';
			let objRuleDesc = parseDataTmpl(rule);
			ruleDesc['desc'] = objRuleDesc;
		}

		tmplDesc[prop] = ruleDesc;
	}
	return tmplDesc;
}

function parseStringRule(rule) {
	let ruleDesc = {};

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
	"parseDataTmpl" : parseDataTmpl
}

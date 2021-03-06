const supportedDataType = ['int', 'string', 'boolean', 'bool', 'date', 'datetime', 'time', 'float', 'object', 'array', 'request', 'empty'];

const util = require("../util/is.util");

const intRule = require("./rule.int");
const boolRule = require("./rule.boolean");
const stringRule = require("./rule.string");
const dateRule = require("./rule.date");
const datetimeRule = require("./rule.datetime");
const timeRule = require("./rule.time");
const floatRule = require('./rule.float');
const objectRule = require('./rule.object');
const arrayRule = require('./rule.array');
const reqRule = require('./rule.request');
const emptyRule = require('./rule.empty');

const logger        = require('../log/log');

/*
 * int - min,max,start,step,random
 *
 *
 */
function parseDataTmpl(dataTmplDef) {
	var tmplDesc = {};
	if(util.isString(dataTmplDef)) {
		tmplDesc = parseStringRule(dataTmplDef);
	}else if(util.isArray(dataTmplDef)) {
		tmplDesc['dataType'] = "array";
		let arrayRuleDesc = [];
		for(let i=0; i<dataTmplDef.length; i++) {
			let arrEleRule = dataTmplDef[i];
			let objRuleDesc = parseDataTmpl(arrEleRule);
			arrayRuleDesc.push(objRuleDesc);
		}
		tmplDesc['desc'] = arrayRuleDesc;
	}else{
		tmplDesc['dataType'] = "object";
		let dataDesc = {};
		for(let prop in dataTmplDef) {
			let rule = dataTmplDef[prop];
			let ruleDesc;
			if(util.isString(rule)) {
				ruleDesc = parseStringRule(rule);
			}else if(util.isArray(rule)) {
				ruleDesc={};
				ruleDesc['dataType'] = 'array';
				let arrayRuleDesc = [];
				for(let i=0; i<rule.length; i++) {
					let arrEleRule = rule[i];
					let objRuleDesc = parseDataTmpl(arrEleRule);
					arrayRuleDesc.push(objRuleDesc);
				}
				ruleDesc['desc'] = arrayRuleDesc;
			}else{
				ruleDesc = parseDataTmpl(rule);
			}

			dataDesc[prop] = ruleDesc;
		}
		tmplDesc['desc'] = dataDesc;
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
		}else if(dataType == 'array') {
			var arrayRuleDesc = arrayRule.parseRule(ruleItemStrs);
			ruleDesc.desc = arrayRuleDesc;
		}else if(dataType == 'request') {
			var reqRuleDesc = reqRule.parseRule(ruleItemStrs);
			ruleDesc.desc = reqRuleDesc;
		}else if(dataType == 'empty') {
			var emptyRuleDesc = emptyRule.parseRule(ruleItemStrs);
			ruleDesc.desc = emptyRuleDesc;
		}
	}

	return ruleDesc;
}

module.exports = {
	"parseDataTmpl" : parseDataTmpl
}

const request = require('request');
const logger  = require('../../log/log');

const ruleEngine = require('../../rule/rule.engine');
const ruleParser = require("../../rule/rule.parser");

var _swaggerTmplSet = {};

function load(url, mappings) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if(error) {
                reject(error);
            }else{
                let json = JSON.parse(body);
                let paths = json['paths'];
                for(let api in paths) {
                    let apiDesc = paths[api];
                    if(!mappings[api]) {
                        mappings[api] = {};
                    }
                    for(let method in apiDesc) {
                        let schema = paths[api][method]['responses']['200']['schema'];
                        if(schema) {
                            let tmplDef = toTmplExpr(schema, json);
                            let tmplDesc = ruleParser.parseDataTmpl(tmplDef);
                            _swaggerTmplSet[api+"_"+method.toUpperCase()] = tmplDesc;
                        }else{
                            let tmplDef = "empty";
                            let tmplDesc = ruleParser.parseDataTmpl(tmplDef);
                            _swaggerTmplSet[api+"_"+method.toUpperCase()] = tmplDesc;
                        }
                        mappings[api][method.toUpperCase()] = {
                            type : 'swagger',
                			dataKey : api+"_"+method.toUpperCase(),
                			count : 1
                        }
                    }
                }
            }
        });
	});
}

function toTmplExpr(schema, json) {
    let tmplDef;
    if(schema["$ref"]) {
        let ref = schema["$ref"];
        if(ref.startsWith("#/definitions/")) {
            ref = ref.replace("#/definitions/", "");
            let refDef = json['definitions'][ref];
            if(refDef.type == 'object') {
                let refProps = refDef.properties;
                tmplDef = {};
                for(let prop in refProps) {
                    tmplDef[prop] = toTmplExpr(refProps[prop], json);
                }
            }
        }
    }else if(schema.type == "array") {
        var itemSchema = schema['items'];
        tmplDef = [];
        tmplDef.push(toTmplExpr(itemSchema, json));
    }else if(schema.type == 'boolean') {
        tmplDef = "boolean|random";
    }else if(schema.type == 'string') {
        if(schema.format && schema.format == 'date-time') {
            tmplDef = "datetime|now";
        }else{
            tmplDef = "string|regex|/[a-zA-Z]{10}/";
        }
    }else if(schema.type == 'integer') {
        tmplDef = "int|1~100";
    }else if(schema.type == 'number') {
        if(schema.format && (schema.format == 'float' || schema.format == 'double')) {
            tmplDef = "float|0.1~10.0";
        }
    }else if(schema.type == 'object') {
        let mapKey = "demoKey";
        let additionalProperties = schema['additionalProperties'];
        tmplDef = {};
        tmplDef[mapKey] = toTmplExpr(additionalProperties, json);
    }
    return tmplDef;
}

function getSwaggerTmplSet() {
    return _swaggerTmplSet;
}

function setSwaggerTmplSet(swaggerTmplSet) {
    _swaggerTmplSet = swaggerTmplSet;
}

module.exports = {
    "load" : load,
    "getSwaggerTmplSet" : getSwaggerTmplSet
}

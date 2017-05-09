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
                            if(schema.type == 'boolean') {
                                let tmplDef = "boolean|random";
                                let tmplDesc = ruleParser.parseDataTmpl(tmplDef);
                                _swaggerTmplSet[api+"_"+method.toUpperCase()] = tmplDesc;
                            }
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

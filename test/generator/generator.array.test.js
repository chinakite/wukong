const expect  = require('chai').expect;
const arrayGen = require("../../src/generator/generator.array");
const stringUtil = require("../../src/util/string.util");

const template      = require('../../src/template/template');

describe('Test generator.array.js', function() {
    var curDate = new Date();
    var today = curDate.getFullYear() + "-" + stringUtil.zeroize((curDate.getMonth()+1)) + "-" + stringUtil.zeroize(curDate.getDate());

    describe('Test policy [object definitions]', function() {
        it('Generate result by plain object definitions', function(done) {
            new Promise(async function (resolve) {
                var arrRuleDesc = [
                        {
                            "dataType": "object",
                            "desc": {
                                "int": {
                                    "dataType": "int",
                                    "desc": {
                                        "policy": "step",
                                        "min": 100,
                                        "step": 1
                                    }
                                },
                                "date": {
                                    "dataType": "date",
                                    "desc": {
                                        "policy": "today",
                                        "format": "yyyy-MM-dd"
                                    }
                                },
                                "obj": {
                                    "dataType": "object",
                                    "desc": {
                                        "name": {
                                            "dataType": "string",
                                            "desc": {
                                                "policy": "fixed",
                                                "value": "WUKONG 1"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            "dataType": "object",
                            "desc": {
                                "int": {
                                    "dataType": "int",
                                    "desc": {
                                        "policy": "step",
                                        "min": 1000,
                                        "step": 1
                                    }
                                },
                                "date": {
                                    "dataType": "date",
                                    "desc": {
                                        "policy": "today",
                                        "format": "yyyy-MM-dd"
                                    }
                                },
                                "obj": {
                                    "dataType": "object",
                                    "desc": {
                                        "name": {
                                            "dataType": "string",
                                            "desc": {
                                                "policy": "fixed",
                                                "value": "WUKONG 2"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ];

                var multiExpected = [
                    {
                        "int": 100, "date" : today, "obj": {"name": "WUKONG 1"}
                    },
                    {
                        "int": 1000, "date" : today, "obj": {"name": "WUKONG 2"}
                    }
                ];

                var config = {};
                let result = await arrayGen.generate(arrRuleDesc, 1, config);
                expect(result).to.be.deep.equal(multiExpected);
                resolve();
           })
           .then(done);
        });

    });

    describe('Test policy [string and reference definitions]', function() {
        it('Generate multi result', function(done) {
            new Promise(async function (resolve) {
                var arrRuleDesc = {
                    "refDesc": "address",
                    "count": 3
                };

                tmplSet = {
                    "address": {
                        "dataType": "object",
                        "desc": {
                            "int": {
                                "dataType": "int",
                                "desc": {
                                    "policy": "step",
                                    "min": 100,
                                    "step": 1
                                }
                            },
                            "date": {
                                "dataType": "date",
                                "desc": {
                                    "policy": "today",
                                    "format": "yyyy-MM-dd"
                                }
                            }
                        }
                    }
                };
                template.setTmplSet(tmplSet);

                var multiExpected = [
                    {
                        "int": 100, "date" : today,
                    },
                    {
                        "int": 101, "date" : today,
                    },
                    {
                        "int": 102, "date" : today,
                    }
                ];

                var config = {};
                let result = await arrayGen.generate(arrRuleDesc, 1, config);
                expect(result).to.be.deep.equal(multiExpected);
                resolve();
            })
            .then(done);
         });
     });
});

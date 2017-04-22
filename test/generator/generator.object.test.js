const expect  = require('chai').expect;
const objectGen = require("../../src/generator/generator.object");
const stringUtil = require("../../src/util/string.util");


describe('Test generator.object.js', function() {
    var curDate = new Date();
    var today = curDate.getFullYear() + "-" + stringUtil.zeroize((curDate.getMonth()+1)) + "-" + stringUtil.zeroize(curDate.getDate());

    describe('Test policy [object definitions]', function() {
        it('Generate one result', function(done) {
            new Promise(async function (resolve) {
                var objRuleDesc = {
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
                                    "value": "WUKONG"
                                }
                            },
                            "subObj": {
                                "dataType": "object",
                                "desc": {
                                    "subObjName": {
                                        "dataType": "string",
                                        "desc": {
                                            "policy": "fixed",
                                            "value": "Xiao WUKONG"
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                var singleExpected = {
                    "int": 100, "date" : today, "obj": {"name": "WUKONG", "subObj":{"subObjName": "Xiao WUKONG"}}
                };

                var config = {};
                let result = await objectGen.generate(objRuleDesc, 1, config);
                expect(result).to.be.deep.equal(singleExpected);
                resolve();
           })
           .then(done);
        });

        it('Generate 5 results', function(done) {
            new Promise(async function (resolve) {
                var objRuleDesc = {
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
                                    "value": "WUKONG"
                                }
                            }
                        }
                    }
                };

                var multiExpected = [
                    {
                        "int": 100, "date" : today, "obj": {"name": "WUKONG"}
                    },
                    {
                        "int": 101, "date" : today, "obj": {"name": "WUKONG"}
                    },
                    {
                        "int": 102, "date" : today, "obj": {"name": "WUKONG"}
                    },
                    {
                        "int": 103, "date" : today, "obj": {"name": "WUKONG"}
                    },
                    {
                        "int": 104, "date" : today, "obj": {"name": "WUKONG"}
                    }
                ];

                var config = {};
                let result = await objectGen.generate(objRuleDesc, 5, config);
                expect(result).to.be.deep.equal(multiExpected);
                resolve();
           })
           .then(done);
        });

    });

    describe('Test policy [string and reference definitions]', function() {
        it('Generate one result', function(done) {
            new Promise(async function (resolve) {
                var objRuleDesc = "object|@address";
                resolve();
            })
            .then(done);
         });
     });
});

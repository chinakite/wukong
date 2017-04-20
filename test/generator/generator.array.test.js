const expect  = require('chai').expect;
const arrayGen = require("../../src/generator/generator.array");


describe('Test generator.array.js', function() {
    describe('Test policy [object definitions]', function() {
        it('Generate result by plain object definitions', function(done) {
            new Promise(async function (resolve) {
                var arrRuleDesc = [
                    {
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
                    },
                    {
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
                ];

                var multiExpected = [
                    {
                        "int": 100, "date" : "2017-04-20", "obj": {"name": "WUKONG 1"}
                    },
                    {
                        "int": 1000, "date" : "2017-04-20", "obj": {"name": "WUKONG 2"}
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

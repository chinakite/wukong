const expect  = require('chai').expect;
const ruleParser = require("../../src/rule/rule.parser");

describe('Test rule.parser.js', function() {
    describe('Test string rule parser', function() {
        it('Test string rule', function() {
            let tmpl = 'string|regex|/[a-zA-Z]{10}/';
            let expected = {
                dataType : "string",
                desc: {
                    "_policy": "regex",
                    "_regex": "[a-zA-Z]{10}"
                }
            }
            expect(ruleParser.parseDataTmpl(tmpl)).to.be.deep.equal(expected);
        });

        it('Test object rule with string props full', function() {
            let tmpl = {
                int   : 'int|100+1',
            	string_regex : 'string|regex|/[a-zA-Z]{10}/',
            	bool : 'boolean|random',
            	date : "date|today|#yyyy/MM/dd",
            	datetime : "datetime|now",
            	time : "time|now",
            	string_fixed : "string|'超级管理员'",
            	string_my : "string|my|display_monitor_brand",
            	float : "float|0.5+0.02",
                obj : "object|@another_tmpl"
            };

            let expected = {
                    dataType : "object",
                    desc : {
                        "int": {
                            "dataType": "int",
                            "desc": {
                                "_policy": "step",
                                "_min": 100,
                                "_step": 1
                            }
                        },
                        "string_regex": {
                            "dataType": "string",
                            "desc": {
                                "_policy": "regex",
                                "_regex": "[a-zA-Z]{10}"
                            }
                        },
                        "bool": {
                            "dataType": "boolean",
                            "desc": {
                                "_policy": "random"
                            }
                        },
                        "date": {
                            "dataType": "date",
                            "desc": {
                                "_policy": "today",
                                "_format": "yyyy/MM/dd"
                            }
                        },
                        "datetime": {
                            "dataType": "datetime",
                            "desc": {
                                "_policy": "now",
                                "_format": "yyyy-MM-dd HH:mm:ss"
                            }
                        },
                        "time": {
                            "dataType": "time",
                            "desc": {
                                "_policy": "now",
                                "_format": "HH:mm:ss"
                            }
                        },
                        "string_fixed": {
                            "dataType": "string",
                            "desc": {
                                "_policy": "fixed",
                                "_value": "超级管理员"
                            }
                        },
                        "string_my": {
                            "dataType": "string",
                            "desc": {
                                "_policy": "my",
                                "_mypolicy": "display_monitor_brand"
                            }
                        },
                        "float": {
                            "dataType": "float",
                            "desc": {
                                "_policy": "step",
                                "_min": 0.5,
                                "_step": 0.02,
                                "_precision": 2
                            }
                        },
                        "obj": {
                            "dataType": "object",
                            "desc": {
                                "_refDesc": "another_tmpl"
                            }
                        }
                    }
                }
            expect(ruleParser.parseDataTmpl(tmpl)).to.be.deep.equal(expected);
        });

        it('Test object rule with string and object props', function() {
            let tmpl = {
                int : 'int|100+1',
                obj : {
                    sub_int : "int|100-1",
                    sub_name : "string|'test_sub_name'"
                }
            };

            let expected = {
                dataType : "object",
                desc : {
                    "int": {
                        "dataType": "int",
                        "desc": {
                            "_policy": "step",
                            "_min": 100,
                            "_step": 1
                        }
                    },
                    "obj": {
                        "dataType": "object",
                        "desc": {
                            "sub_int": {
                                "dataType": "int",
                                "desc": {
                                    "_policy": "step",
                                    "_max": 100,
                                    "_step": -1
                                }
                            },
                            "sub_name": {
                                "dataType": "string",
                                "desc": {
                                    "_policy": "fixed",
                                    "_value": "test_sub_name"
                                }
                            }
                        }
                    }
                }
            }
            expect(ruleParser.parseDataTmpl(tmpl)).to.be.deep.equal(expected);
        });
        /*
        it('Test string & array rule', function() {
            let tmpl = {
                int : 'int|100+1',
                arr : [
                    {
                        sub_int : "int|100-1",
                        sub_name : "string|'test_sub_name'"
                    },
                    {
                        sub_int : "int|100-1",
                        sub_name : "string|'test_sub_name'"
                    }
                ]
            };

            let expected = {
                    "int": {
                        "dataType": "int",
                        "desc": {
                            "_policy": "step",
                            "_min": 100,
                            "_step": 1
                        }
                    },
                    "arr": {
                        "dataType": "array",
                        "desc": [
                            {
                                "dataType": "object",
                                "desc": {
                                    "sub_int": {
                                        "dataType": "int",
                                        "desc": {
                                            "_policy": "step",
                                            "_max": 100,
                                            "_step": -1
                                        }
                                    },
                                    "sub_name": {
                                        "dataType": "string",
                                        "desc": {
                                            "_policy": "fixed",
                                            "_value": "test_sub_name"
                                        }
                                    }
                                }
                            },
                            {
                                "dataType": "object",
                                "desc": {
                                    "sub_int": {
                                        "dataType": "int",
                                        "desc": {
                                            "_policy": "step",
                                            "_max": 100,
                                            "_step": -1
                                        }
                                    },
                                    "sub_name": {
                                        "dataType": "string",
                                        "desc": {
                                            "_policy": "fixed",
                                            "_value": "test_sub_name"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            expect(ruleParser.parseDataTmpl(tmpl)).to.be.deep.equal(expected);
        });
        */
    });
});

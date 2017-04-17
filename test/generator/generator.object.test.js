const expect  = require('chai').expect;
const objectGen = require("../../src/generator/generator.object");

describe('Test generator.object.js', function() {
    describe('Test policy [object definitions]', function() {
        var objRuleDesc = {
            "int": {
                "dataType": "int",
                "desc": {
                    "policy": "step",
                    "min": 100,
                    "step": 1
                }
            },
            "string": {
                "dataType": "string",
                "desc": {
                    "policy": "fixed",
                    "value": "TestObject"
                }
            }
        };

        var singleExpected = {
            "int": 100, "string" : "TestObject"
        };

        var config = {};
        it('Generate one result', function() {
            expect(objectGen.generate(objRuleDesc, 1, config)).to.be.deep.equal();
        });
        // it('Generate 5 results', function() {
        //     expect(objectGen.generate(boolRuleDesc, 5, config)).to.deep.equal([true, true, true, true, true]);
        // });
    });

});

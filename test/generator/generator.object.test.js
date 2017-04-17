const expect  = require('chai').expect;
const objectGen = require("../../src/generator/generator.object");


describe('Test generator.object.js', function() {
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
                let result = await objectGen.generate(objRuleDesc, 1, config);
                // expect(result).to.be.deep.equal(singleExpected);
                console.log("aaaaaaa ===================");
                resolve();
           })
           .then(done);
        });
    });
});

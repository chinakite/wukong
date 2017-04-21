const expect  = require('chai').expect;
const stringGen = require("../../src/generator/generator.string");

describe('Test generator.string.js', function() {
    describe('Test policy [fixed]', function() {
        var stringRuleDesc = {policy: "fixed", value: "Hello, WUKONG!"};
        var config = {};
        it('Generate one result', function(done) {
            new Promise(async function(resolve) {
                var result = await stringGen.generate(stringRuleDesc, 1, config);
                expect(result).to.be.equal("Hello, WUKONG!");
                resolve();
           })
           .then(done);
        });
    });
});

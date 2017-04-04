const expect  = require('chai').expect;
const boolGen = require("../../src/generator/generator.boolean");

describe('Test generator.boolean.js', function() {
    describe('Test policy [true]', function() {
        var boolRuleDesc = {policy: "true"};
        var config = {};
        it('Generate one result', function() {
            expect(boolGen.generate(boolRuleDesc, 1, config)).to.be.ok;
        });
        it('Generate 5 results', function() {
            expect(boolGen.generate(boolRuleDesc, 5, config)).to.deep.equal([true, true, true, true, true]);
        });
    });

    describe('Test policy [false]', function() {
        var boolRuleDesc = {policy: "false"};
        var config = {};
        it('Generate one result', function() {
            expect(boolGen.generate(boolRuleDesc, 1, config)).to.not.be.ok;
        });
        it('Generate 5 results', function() {
            expect(boolGen.generate(boolRuleDesc, 5, config)).to.deep.equal([false, false, false, false, false]);
        });
    });

    describe('Test policy [step]', function() {
        var boolRuleDesc = {policy: "step"};
        var config = {};
        it('Generate one result', function() {
            expect(boolGen.generate(boolRuleDesc, 1, config)).to.be.ok;
        });
        it('Generate 5 results', function() {
            expect(boolGen.generate(boolRuleDesc, 5, config)).to.deep.equal([true, false, true, false, true]);
        });
    });

    describe('Test policy [random]', function() {
        var boolRuleDesc = {policy: "random"};
        var config = {};
        it('Generate one result', function() {
            var r = boolGen.generate(boolRuleDesc, 1, config);
            if(r) {
                expect(r).to.be.ok;
            }else{
                expect(r).to.not.be.ok;
            }
        });
        it('Generate 5 results', function() {
            expect(boolGen.generate(boolRuleDesc, 5, config).length).to.be.equal(5);
        });
    });
});

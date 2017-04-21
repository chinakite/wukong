const expect  = require('chai').expect;
const dateGen = require("../../src/generator/generator.date");

describe('Test generator.date.js', function() {

    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    describe('Test policy [today]', function() {
        var dateRuleDesc = {policy: "today", format:"yyyy-MM-dd"};
        var config = {};
        var curDate = new Date();
        var today = curDate.getFullYear() + "-" + zeroize((curDate.getMonth()+1)) + "-" + zeroize(curDate.getDate());
        it('Generate one result', function() {
            expect(dateGen.generate(dateRuleDesc, 1, config)).to.be.equal(today);
        });
        it('Generate 5 results', function() {
            expect(dateGen.generate(dateRuleDesc, 5, config)).to.deep.equal([today, today, today, today, today]);
        });
    });

    describe('Test policy [now]', function() {
        var dateRuleDesc = {policy: "now", format:"yyyy-MM-dd"};
        var config = {};
        var curDate = new Date();
        var today = curDate.getFullYear() + "-" + zeroize((curDate.getMonth()+1)) + "-" + zeroize(curDate.getDate());
        it('Generate one result', function() {
            expect(dateGen.generate(dateRuleDesc, 1, config)).to.be.equal(today);
        });
        it('Generate 5 results', function() {
            expect(dateGen.generate(dateRuleDesc, 5, config)).to.deep.equal([today, today, today, today, today]);
        });
    });

    describe('Test policy [yesterday]', function() {
        var dateRuleDesc = {policy: "yesterday", format:"yyyy-MM-dd"};
        var config = {};
        var curDate = new Date();
        curDate.setDate(curDate.getDate() - 1);
        var yesterday = curDate.getFullYear() + "-" + zeroize((curDate.getMonth()+1)) + "-" + zeroize(curDate.getDate());
        it('Generate one result', function() {
            expect(dateGen.generate(dateRuleDesc, 1, config)).to.be.equal(yesterday);
        });
        it('Generate 5 results', function() {
            expect(dateGen.generate(dateRuleDesc, 5, config)).to.deep.equal([yesterday, yesterday, yesterday, yesterday, yesterday]);
        });
    });

    describe('Test policy [tomorrow]', function() {
        var dateRuleDesc = {policy: "tomorrow", format:"yyyy-MM-dd"};
        var config = {};
        var curDate = new Date();
        curDate.setDate(curDate.getDate() + 1);
        var tomorrow = curDate.getFullYear() + "-" + zeroize((curDate.getMonth()+1)) + "-" + zeroize(curDate.getDate());
        it('Generate one result', function() {
            expect(dateGen.generate(dateRuleDesc, 1, config)).to.be.equal(tomorrow);
        });
        it('Generate 5 results', function() {
            expect(dateGen.generate(dateRuleDesc, 5, config)).to.deep.equal([tomorrow, tomorrow, tomorrow, tomorrow, tomorrow]);
        });
    });

    describe('Test format [MM/dd/yyyy]', function() {
        var dateRuleDesc = {policy: "today", format:"MM/dd/yyyy"};
        var config = {};
        var curDate = new Date();
        var today = zeroize((curDate.getMonth()+1)) + "/" + zeroize(curDate.getDate()) + "/" + curDate.getFullYear();
        it('Generate one result', function() {
            expect(dateGen.generate(dateRuleDesc, 1, config)).to.be.equal(today);
        });
        it('Generate 5 results', function() {
            expect(dateGen.generate(dateRuleDesc, 5, config)).to.deep.equal([today, today, today, today, today]);
        });
    });

});

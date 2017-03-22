const expect = require('chai').expect;
const util   = require("../src/util");

describe('Test util.js', function() {
    describe('Test regex methods', function() {
        it('Test regex return boolean', function() {
            expect(util.regexTest("+1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(util.regexTest("-1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(util.regexTest("-1+", /(\+|\-)(\d+)$/g)).to.not.be.ok;
        });
    });
});

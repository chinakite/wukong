const expect = require('chai').expect;
const regexUtil   = require("../../src/util/regex.util");

describe('Test regex.util.js', function() {
    describe('Test regexTest', function() {
        it('Test regex return boolean', function() {
            expect(regexUtil.regexTest("+1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(regexUtil.regexTest("-1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(regexUtil.regexTest("-1+", /(\+|\-)(\d+)$/g)).to.not.be.ok;
        });
    });
});

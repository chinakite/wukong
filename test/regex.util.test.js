const expect = require('chai').expect;
const regexUtil   = require("../src/util/regex.util");

describe('Test regex.util.js', function() {
    describe('Test regexTest', function() {
        it('"+1" or "-1" with pattern /(\+|\-)(\d+)$/g ==> true', function() {
            expect(regexUtil.regexTest("+1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(regexUtil.regexTest("-1", /(\+|\-)(\d+)$/g)).to.be.ok;
            expect(regexUtil.regexTest("-1+", /(\+|\-)(\d+)$/g)).to.not.be.ok;
        });
        it('"-1+" or "100" with pattern /(\+|\-)(\d+)$/g ==> false', function() {
            expect(regexUtil.regexTest("100", /(\+|\-)(\d+)$/g)).to.not.be.ok;
            expect(regexUtil.regexTest("-1+", /(\+|\-)(\d+)$/g)).to.not.be.ok;
        });
    });
});

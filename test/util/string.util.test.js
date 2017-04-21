const expect = require('chai').expect;
const stringUtil   = require("../../src/util/string.util");

describe('Test string.util.js', function() {
    describe('Test zeroize', function() {
        it('9 to 09', function() {
            expect(stringUtil.zeroize("9", 2)).to.be.equal("09");
        });
        it('99 to 99', function() {
            expect(stringUtil.zeroize("99", 2)).to.be.equal("99");
        });
    });
});

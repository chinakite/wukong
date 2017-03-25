const expect = require('chai').expect;
const fileUtil   = require("../src/util/file.util");

describe('Test file.util.js', function() {
    describe('Test randline', function() {
        it('Single Line File ==> Hello, Wukong! 你好，悟空!', function() {
            expect(fileUtil.randline(process.cwd()+"/test/data/singleline.file.wk72")).to.be.equal('Hello, Wukong! 你好，悟空!');
        });
    });
});

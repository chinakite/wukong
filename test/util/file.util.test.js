const expect = require('chai').expect;
const fileUtil   = require("../../src/util/file.util");

describe('Test file.util.js', function() {
    describe('Test randline', function() {
        it('Single Line File ==> Hello, Wukong! 你好，悟空!', function(done) {
            new Promise(async function (resolve) {
                const randline = await fileUtil.randline(process.cwd()+"/testdata/singleline.file.wk72");
                expect(randline).to.be.equal('Hello, Wukong! 你好，悟空!');
                resolve();
           })
           .then(done);
        });
    });
});

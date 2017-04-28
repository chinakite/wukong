const expect = require('chai').expect;
const swaggerLoader   = require("../../../src/intergration/swagger/api.swagger.loader");

describe('Test api.swagger.loader.js', function() {
    describe('Test get json', function() {
        var testUrl1 = "http://www.baidu.com";

        it('Get ' + testUrl1, function(done) {
            new Promise(async function (resolve) {
                const respBody = await swaggerLoader.load(testUrl1);
                expect(respBody).to.contain("<title>百度一下，你就知道</title>");
                resolve();
           })
           .then(done);
        });
    });
});

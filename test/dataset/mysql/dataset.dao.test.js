const expect  = require('chai').expect;
const dataSetDao = require('../../../src/dataset/mysql/dataset.dao');

describe('Test dataset.dao.js', function() {
    it('Test findAll()', function(done) {
        new Promise(async function (resolve) {
            dataSetDao.findAll().then(function(datasets){
                expect(datasets.length).to.be.equal(1);
                resolve();
            });
       }).then(done);
    });
});

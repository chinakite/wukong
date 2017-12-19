const expect  = require('chai').expect;
const Sequelize = require('sequelize');

const sequelize = require("../../../src/storage/mysql/sequelize").sequelize;

const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

describe('Test sequelize.js', function() {
    describe('Test connection', function() {
        it('Test connect', function() {
            sequelize
                .authenticate()
                .then(() => {
                    console.log('Connection has been established successfully.');
                    expect(true).to.be.equal(true);
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                    expect(true).to.be.equal(false);
                });
        });
    });
});

const Sequelize = require('sequelize');
const mysqlDb = require('../../../wukong.config.mysql');

var sequelize = new Sequelize(mysqlDb.database, mysqlDb.username, mysqlDb.password, {
    host: mysqlDb.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

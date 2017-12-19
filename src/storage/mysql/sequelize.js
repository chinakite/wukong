const Sequelize = require('sequelize');
const mysqlDb = require('../../../wukong.config.mysql');

const sequelize = new Sequelize(mysqlDb.database, mysqlDb.username, mysqlDb.password, {
    host: mysqlDb.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    operatorsAliases: false
});

module.exports = {
    "sequelize": sequelize
}

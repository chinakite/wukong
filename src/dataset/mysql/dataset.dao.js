const Sequelize = require('sequelize');
const sequelize = require("../../storage/mysql/sequelize").sequelize;

var DataSet = sequelize.define(
    't_dataset',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        name: { type: Sequelize.STRING, field: 'c_name', allowNull: false}
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

function findAll() {
    return DataSet.findAll();
};

module.exports = {
    "findAll" : findAll
}

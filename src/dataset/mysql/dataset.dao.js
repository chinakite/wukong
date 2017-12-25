const Sequelize = require('sequelize');
const sequelize = require("../../src/storage/mysql/sequelize").sequelize;

var DataSet = sequelize.define(
    'dataset',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        name: { type: Sequelize.STRING, field: 'c_name', allowNull: false}
    },
    {timestamps: false}
);

function findAll() {
    DataSet.findAll().then(dataset => {
        console.log(dataset.length);
    });
};

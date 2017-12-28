const Sequelize = require('sequelize');
const sequelize = require("../../storage/mysql/sequelize").sequelize;

var Template = sequelize.define(
    't_template',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        name: { type: Sequelize.STRING, field: 'c_name', allowNull: false},
        tmpl: { type: Sequelize.STRING, field: 'c_tmpl', allowNull: false},
        creator: { type: Sequelize.BIGINT, field: 'c_creator', allowNull: false},
        createTime: { type: Sequelize.DATE, field: 'c_create_time', allowNull: false},
        modifier: { type: Sequelize.BIGINT, field: 'c_modifier', allowNull: true},
        modifyTime: { type: Sequelize.DATE, field: 'c_modify_time', allowNull: true}
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

let findAll = function() {
    return Template.findAll();
};

module.exports = {
    "findAll" : findAll
}

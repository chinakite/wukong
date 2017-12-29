const Sequelize = require('sequelize');
const sequelize = require("../../storage/mysql/sequelize").sequelize;

var Mapping = sequelize.define(
    't_mapping',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        url: { type: Sequelize.STRING, field: 'c_url', allowNull: false},
        type: { type: Sequelize.STRING, field: 'c_type', allowNull: false},
        dataKey: { type: Sequelize.STRING, field: 'c_datakey', allowNull: false},
        method: { type: Sequelize.STRING, field: 'c_method', allowNull: true},
        state: { type: Sequelize.STRING, field: 'c_state', allowNull: true},
        count: { type: Sequelize.INTEGER, field: 'c_count', allowNull: true},
        wrapper: { type: Sequelize.STRING, field: 'c_wrapper', allowNull: true},
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
    return Mapping.findAll();
};

module.exports = {
    "findAll" : findAll
}

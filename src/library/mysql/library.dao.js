const Sequelize = require('sequelize');
const sequelize = require("../../storage/mysql/sequelize").sequelize;

var Library = sequelize.define(
    't_library',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        name: { type: Sequelize.STRING, field: 'c_name', allowNull: false},
        creator: { type: Sequelize.BIGINT, field: 'c_creator', allowNull: false},
        createTime: { type: Sequelize.DATE, field: 'c_create_time', allowNull: false},
        modifier: { type: Sequelize.BIGINT, field: 'c_modifier', allowNull: true},
        modifyTime: { type: Sequelize.DATE, field: 'c_modify_time', allowNull: false}
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

var LibraryData = sequelize.define(
    't_library_data',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        data: { type: Sequelize.STRING, field: 'c_data', allowNull: false},
        creator: { type: Sequelize.BIGINT, field: 'c_creator', allowNull: false},
        createTime: { type: Sequelize.DATE, field: 'c_create_time', allowNull: false},
        modifier: { type: Sequelize.BIGINT, field: 'c_modifier', allowNull: true},
        modifyTime: { type: Sequelize.DATE, field: 'c_modify_time', allowNull: false}
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Library.hasMany(LibraryData, {foreignKey: 'c_library_id', as:"datas"});

let findAll = function() {
    return Library.findAll();
};

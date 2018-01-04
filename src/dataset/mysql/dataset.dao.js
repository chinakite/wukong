const Sequelize = require('sequelize');
const sequelize = require("../../storage/mysql/sequelize").sequelize;

var DataSet = sequelize.define(
    't_dataset',
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

var DataSetData = sequelize.define(
    't_dataset_data',
    {
        id : { type: Sequelize.BIGINT, field: 'c_id', allowNull: false, primaryKey: true, autoIncrement: true},
        state: { type: Sequelize.STRING, field: 'c_state', allowNull: false},
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

DataSet.hasMany(DataSetData, {foreignKey: 'c_dataset_id', as:"datas"});

let findAll = function() {
    return DataSet.findAll();
};

let findAllWithDatas = function() {
    return DataSet.findAll({
        include: [
            {model: DataSetData, as: 'datas'}
        ]
    });
};

let insertDataInfo = function(dataInfo, operId, options) {
    dataInfo.creator = operId;
    dataInfo.createTime = new Date();
    return DataSet.create(dataInfo, options);
};

let insertData = function(data, operId, options) {
    data.creator = operId;
    data.createTime = new Date();
    return DataSetData.create(data, options);
};

module.exports = {
    "sequelize" : sequelize,
    "findAll" : findAll,
    "findAllWithDatas" : findAllWithDatas,
    "insertDataInfo" : insertDataInfo
}

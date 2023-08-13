
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreBillModel extends Model {
        static associate(models) {
            this.hasMany(models.StoreBillMaterialModel, {
                foreignKey: 'store_bill_id',
                as: 'billMaterials',
            });
        }
    }
    StoreBillModel.init({
        total : {
            type : DataTypes.DOUBLE,
            allowNull : false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, {
        sequelize,
        modelName: 'StoreBillModel',
        tableName: 'storebill',
        underscored: true,
    },
    );
    return StoreBillModel;
};
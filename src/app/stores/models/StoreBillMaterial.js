
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StoreBillMaterialModel extends Model {
        static associate(models) {
            this.belongsTo(models.StoreModel, {
                foreignKey: 'store_id',
                as: 'store',
            });
            this.belongsTo(models.StoreBillModel, {
                foreignKey: 'store_bill_id',
                as: 'storeBill',
            });
        }
    }
    StoreBillMaterialModel.init({
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },

    }, {
        sequelize,
        modelName: 'StoreBillMaterialModel',
        tableName: 'storebillmaterial',
        underscored: true,
    },);
    return StoreBillMaterialModel;
};
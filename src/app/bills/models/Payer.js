const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PayerModel extends Model {
        static associate(models) {
            this.hasMany(models.BillModel, {
                foreignKey: 'payer_id',
                as: 'bills',
            });
        }
    }
    PayerModel.init({
        first_name: {
            type : DataTypes.STRING,
            allowNull : false
        },
        last_name: {
            type: DataTypes.STRING,
            defaultValue : ""
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address : {
            type :DataTypes.STRING,
            defaultValue : ""

        }
    }, {
        sequelize,
        modelName: 'PayerModel',
        tableName: 'payers',
        underscored: true,
    });
    return PayerModel;
};
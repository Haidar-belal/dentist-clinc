const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PayedTaxModel extends Model {
        static associate(models) {
            
        }
    }
    PayedTaxModel.init({
        total : {
            type : DataTypes.DOUBLE,
            allowNull : false
        },
        year : {
            type : DataTypes.DATE,
            allowNull : false
        },

    }, {
        sequelize,
        modelName: 'PayedTaxModel',
        tableName: 'payedtaxes',
        underscored: true,
    });
    return PayedTaxModel;
};
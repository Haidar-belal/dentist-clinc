
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaxModel extends Model {
        static associate(models) {
            this.hasMany(models.BillModel, {
                foreignKey: 'tax_id',
                as: 'bills',
            });
        }
    }
    TaxModel.init({
        percent: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'TaxModel',
        tableName: 'taxs',
        underscored: true,
    });
    return TaxModel;
};
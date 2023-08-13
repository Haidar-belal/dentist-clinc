const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BillModel extends Model {
        static associate(models) {
            this.belongsTo(models.AppointmentModel, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.TaxModel, {
                foreignKey: 'tax_id',
                as: 'tax',
            });
            this.belongsTo(models.PayerModel, {
                foreignKey: 'payer_id',
                as: 'payer',
            });
        }
    }
    BillModel.init({
        total : {
            type : DataTypes.DOUBLE,
            allowNull : false
        },
        paid: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        rest: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status : {
            type :DataTypes.STRING,
            defaultValue : "new"

        }
    }, {
        sequelize,
        modelName: 'BillModel',
        tableName: 'bills',
        underscored: true,
    });
    return BillModel;
};
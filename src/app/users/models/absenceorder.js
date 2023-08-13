
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AbsenceOrderModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }
    AbsenceOrderModel.init({
        accepted: { 
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                  //  msg: "The start date is required"
                },
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
              //  msg: "The end date is required"
            }
        },
    }, {
        sequelize,
        modelName: 'AbsenceOrderModel',
        tableName: 'absence_orders',
        underscored: true
    });
    return AbsenceOrderModel;
};
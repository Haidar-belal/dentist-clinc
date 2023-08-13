
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SalaryModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
        }
    }
    SalaryModel.init({
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'SalaryModel',
        tableName: 'salaries',
        underscored: true
    });
    return SalaryModel;
};
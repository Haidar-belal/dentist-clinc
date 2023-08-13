
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkHourModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }
    WorkHourModel.init({
        day: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'The day is required'
                },
            }
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'The start date is required'
                },
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'The end date is required'
                },
            }
        },
    }, {
        sequelize,
        modelName: 'WorkHourModel',
        tableName: 'work_hours',
        underscored: true
    });
    return WorkHourModel;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoomModel extends Model {
        static associate(models) {
            this.belongsTo(models.DepartmentModel, {
                foreignKey: 'department_id',
                as: 'department',
            });
            this.hasMany(models.ChairModel, {
                foreignKey: 'room_id',
                as: 'chairs',
            });
        }
    }
    RoomModel.init({
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt: true,

            },
        }
    }, {
        sequelize,
        modelName: 'RoomModel',
        tableName: 'rooms',
        underscored: true,
    });
    return RoomModel;
};
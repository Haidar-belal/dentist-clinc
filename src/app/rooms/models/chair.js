
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChairModel extends Model {
        static associate(models) {
            this.hasMany(models.AppointmentReservationModel, {
                foreignKey: 'chair_id',
                as: 'appointment_reservations',
            });
            this.belongsTo(models.RoomModel, {
                foreignKey: 'room_id',
                as: 'room',
            });
        }
    }
    ChairModel.init({
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt: true,
            },
        }
    }, {
        sequelize,
        modelName: 'ChairModel',
        tableName: 'chairs',
        underscored: true,
    });
    return ChairModel;
};
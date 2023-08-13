
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorMaterialOrderModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
            this.belongsTo(models.StoreModel, {
                foreignKey: 'store_id',
                as: 'store',
            });
            this.belongsTo(models.AppointmentReservationModel, {
                foreignKey: 'appointment_reservation_id',
                as: 'appointment_reservation',
            });
        }
    }
    DoctorMaterialOrderModel.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isInt: true,
            }
        },
    }, {
        sequelize,
        modelName: 'DoctorMaterialOrderModel',
        tableName: 'doctor_material_orders',
        underscored: true
    });
    return DoctorMaterialOrderModel;
};
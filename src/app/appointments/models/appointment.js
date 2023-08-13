
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentModel extends Model {
        static associate(models) {
            this.belongsTo(models.PatientModel, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
            this.hasMany(models.AppointmentReservationModel, {
                foreignKey: 'appointment_id',
                as: 'appointment_reservations',
            });
            this.hasMany(models.BillModel, {
                foreignKey: 'appointment_id',
                as: 'bills',
            });
        }
    }
    AppointmentModel.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100],
                matches: /^[a-zA-Z0-9\s\\.,!?"'-]*$/,
            },
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "unpaid",
            allowNull: false,
        },
        // finished: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull: false,
        // }
    }, {
        sequelize,
        modelName: 'AppointmentModel',
        tableName: 'appointments',
        underscored: true
    });
    return AppointmentModel;
};
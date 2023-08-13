
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorCancelReservationModel extends Model {

        // customValidation(days) {
        //     const today = new Date();
        //     const outOfRange = new Date(today);
        //     outOfRange.setDate(today.getDate() + days);
        //     const outOfRangeISO = outOfRange.toISOString().split('T')[0];
        //     return outOfRangeISO;
        // }

        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: {
                    name: 'employee_id',
                    allowNull: true,
                },
                as: 'employee',
                // the id of the reception employee
            });
            this.belongsTo(models.AppointmentReservationModel, {
                foreignKey: {
                    name: 'appointment_reservation_id',
                    onDelete: 'RESTRICT'
                },
                as: 'appointmentreservation',
            });
        }
    }
    DoctorCancelReservationModel.init({
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
            },
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true
                },
                // isAfter: {
                //     args: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
                //     msg: "the date should be today's date or after",
                // },
                isValidDate: function (value) {
                    const now = new Date();
                    const yesterday = new Date(new Date().setDate(new Date().getDate()));
                    if (value.getDate() < yesterday.getDate()) {
                        throw new Error("the date should be today's date or after, please choose a future reservation!");
                    }
                    else if (value.getDate() == yesterday.getDate()){
                        if (value.getTime() < yesterday.getTime()) {
                            throw new Error("this time has passed, please choose a future reservation!");
                        }
                    }
                },
            }
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: {
                    args: false
                },
                isValidDate: function (value) {
                    const now = new Date();
                    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
                    if (value.getDate() < yesterday.getDate()) {
                        throw new Error("the date should be today's date or after, please choose a future reservation!");
                    }
                    else if (value.getDate() == yesterday.getDate()){
                        if (value.getTime() < yesterday.getTime()) {
                            throw new Error("this time has passed, please choose a future reservation!");
                        }
                    }
                },
            //     isAfter: {
            //         args: () => new Date(new Date().setDate(new Date().getDate() - 1)),
            //         msg: "the date should be today's date or after",
            //     },
            //     // isDate: true,
            }
        },
        done: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: {
                    args: false
                },
                // isValidDate: function (value) {
                //     const now = new Date();
                //     const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
                //     if (value.getDate() < yesterday.getDate()) {
                //         throw new Error("the date should be today's date or after, please choose a future reservation!");
                //     }
                //     else if (value.getDate() == yesterday.getDate()){
                //         if (value.getTime() < yesterday.getTime()) {
                //             throw new Error("this time has passed, please choose a future reservation!");
                //         }
                //     }
                // },
                isAfter: {
                    args: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
                },
            //     isBefore: {
            //         args: () => new Date(new Date().setDate(new Date().getDate() + 1)),
            //     },
            //     isDate: true,
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 1000],
                matches: /^[a-zA-Z0-9\s\\.,!?"'-]*$/,
            },
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
    },{
        sequelize,
        modelName: 'DoctorCancelReservationModel',
        tableName: 'doctor_cancel_reservations',
        underscored: true,
    });
    return DoctorCancelReservationModel;
};
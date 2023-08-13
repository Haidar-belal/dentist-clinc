
const { gender, type } = require('../../patients/models/enum.json');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const { Model } = require('sequelize');

const hash = require('../../../../utils/hashPassword/hash');
const { JsonWebTokenError } = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model {
        shit() {
            return 2;
        }
        generateToken() {
            const token = jwt.sign({ id: this.id, type: this.type }, process.env.SECRET_KEY, { expiresIn: '24h' });
            console.log(token);
            return token;
        }
        static associate(models) {
            this.hasMany(models.UserModel, {
                foreignKey: 'manager_id',
                as: 'employees',
            });
            this.belongsTo(models.UserModel, {
                foreignKey: 'manager_id',
                as: 'manager',
            });
            this.hasMany(models.AppointmentModel, {
                foreignKey: 'employee_id',
                as: 'employee_appointments',
            });
            this.hasMany(models.AppointmentModel, {
                foreignKey: 'doctor_id',
                as: 'doctor_appointments',
            });
            this.hasMany(models.BillModel, {
                foreignKey: 'employee_id',
                as: 'bills',
            });
            this.hasMany(models.DepartmentModel, {
                foreignKey: 'manager_id',
                as: 'departments',
            });
            this.hasMany(models.AbsenceOrderModel, {
                foreignKey: 'user_id',
                as: 'absence_orders',
            });
            this.hasMany(models.DoctorDocumentModel, {
                foreignKey: 'doctor_id',
                as: 'doctor_documents',
            });
            this.hasMany(models.DoctorAccommodationModel, {
                foreignKey: 'doctor_id',
                as: 'doctor_accommodations',
            });
            this.hasMany(models.WorkHourModel, {
                foreignKey: 'user_id',
                as: 'work_hours',
            });
            this.hasMany(models.DoctorMaterialOrderModel, {
                foreignKey: 'doctor_id',
                as: 'doctor_material_orders',
            });
            this.hasMany(models.DoctorCancelReservationModel, {
                foreignKey: {
                    name: 'employee_id',
                    allowNull: true,
                },
                as: 'doctor_cancel_reservations',
            });
            this.hasMany(models.SalaryModel, {
                foreignKey: 'employee_id',
                as: 'employee',
            });
            // this.belongsTo(models.DoctorCancelReservationModel, {
            //     foreignKey: 'doctor_id',
            //     as: 'doctor_cancel_reservations',
            // });
        }
    }
    UserModel.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "First Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "First Name must be between 2 and 50 characters long",
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "First Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "First Name must be between 2 and 50 characters long",
                },
            },
        },
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "card_id cannot be empty",
                },
                // unique: {
                //     args: true,
                //     msg: "card_id should be unique"
                // },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email address",
                },
                notEmpty: {
                    args: true,
                    msg: "Email cannot be empty",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Password cannot be empty",
                },
                len: {
                    args: [8, 100],
                    msg: "Password must be between 8 and 100 characters long",
                },
                // isStrongPassword: function(value) {
                //     if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                //     throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
                //     }
                // },
            },
            get() {
                const value = this.getDataValue('password');
                return hash.decrypt(value);
            },
            set(value) {

                this.setDataValue('password', hash.encrypt(value));
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Phone number cannot be empty",
                },
                isValidPhoneNumber: function (value) {
                    if (!value.match(/^09\d{8}$/)) {
                        throw new Error("Phone number must start with '09' and have exactly 10 digits");
                    }
                },
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "City cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "City must be between 2 and 50 characters long",
                },
            },
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Region cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Region must be between 2 and 50 characters long",
                },
            },
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Street cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Street must be between 2 and 50 characters long",
                },
            },
        },
        near_by: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Name must be between 2 and 50 characters long",
                },
            },
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "age cannot be empty",
                }
            },
        },
        gender: {
            type: DataTypes.ENUM,
            values: gender,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Gender cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Gender must be between 2 and 50 characters long",
                },
            },
        },
        deserve: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0'
        },
        type: {
            type: DataTypes.ENUM,
            values: type,
            allowNull: false,
        },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            // defaultValue: ""
        },
    }, {
        sequelize,
        modelName: 'UserModel',
        tableName: 'users',
        underscored: true
    });
    return UserModel;
};
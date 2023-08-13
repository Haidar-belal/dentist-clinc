const { gender } = require('./enum.json');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PatientModel extends Model {
        static associate(models) {
            this.hasMany(models.AppointmentModel, {
                foreignKey: 'patient_id',
                as: 'appointments',
            });
            this.hasMany(models.PatientDocumentModel, {
                foreignKey: 'patient_id',
                as: 'patient_documents',
            });
        }
    }
    PatientModel.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "patient first name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "patient first Name must be between 2 and 50 characters long",
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "patient last name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "patient last name must be between 2 and 50 characters long",
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
                    msg: "card id cannot be empty",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Phone number cannot be empty",
                },
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
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "birthdate cannot be empty",
                }
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Address cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Address must be between 2 and 50 characters long",
                },
            },
        },
        document: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
            // validate: {
            //     notEmpty: {
            //         args: true,
            //         msg: "Address cannot be empty",
            //     },
            //     len: {
            //         args: [2, 50],
            //         msg: "Address must be between 2 and 50 characters long",
            //     },
            // },
        },

    }, {
        sequelize,
        modelName: 'PatientModel',
        tableName: 'patients',
        underscored: true,
    },
    );
    return PatientModel;
};
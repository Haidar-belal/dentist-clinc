
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorAccommodationModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
        }
    }
    DoctorAccommodationModel.init({
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide a valid date before creating aDoctor'
                },
            }
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'DoctorAccommodationModel',
        tableName: 'doctor_accommodations',
        underscored: true
    });
    return DoctorAccommodationModel;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorDocumentModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'doctor_id',
                as: 'doctor',
            });
        }
    }
    DoctorDocumentModel.init({
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'DoctorDocumentModel',
        tableName: 'doctor_documents',
        underscored: true
    });
    return DoctorDocumentModel;
};
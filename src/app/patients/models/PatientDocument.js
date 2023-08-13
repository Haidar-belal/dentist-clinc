
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PatientDocumentModel extends Model {
        static associate(models) {
            this.belongsTo(models.PatientModel, {
                foreignKey: 'patient_id',
                as: 'patient',
            });
        }
    }
    PatientDocumentModel.init({
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        modelName: 'PatientDocumentModel',
        tableName: 'patient_documents',
        underscored: true,
    },
    );
    return PatientDocumentModel;
};
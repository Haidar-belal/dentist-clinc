
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DepartmentModel extends Model {
        static associate(models) {
            this.belongsTo(models.UserModel, {
                foreignKey: 'manager_id',
                as: 'manager',
            });
            this.hasMany(models.RoomModel, {
                foreignKey: 'department_id',
                as: 'rooms',
            });
        }
    }
    DepartmentModel.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100],
                // isString: true,
                matches: /^[a-zA-Z0-9\s\\.,!?"'-]*$/,
            },
        }
    }, {
        sequelize,
        modelName: 'DepartmentModel',
        tableName: 'departments',
        underscored: true,
    });
    return DepartmentModel;
};
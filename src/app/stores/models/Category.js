const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CategoryModel extends Model {
        static associate(models) {
            this.hasMany(models.StoreModel, {
                foreignKey: 'category_id',
                as: 'stores',
            });
        }
    }
    CategoryModel.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'CategoryModel',
        tableName: 'categories',
        underscored: true,
    });
    return CategoryModel;
};
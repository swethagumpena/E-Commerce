const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    categoryId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    itemName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    features: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};

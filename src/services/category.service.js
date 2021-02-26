const axios = require('axios').default;
const { Op } = require('sequelize');
const { Category } = require('../models');
const { Item } = require('../models');

const postCategory = async (categoriesArray) => {
  categoriesArray.map(async (product) => {
    await Category.destroy({
      truncate: true,
    });
    const category = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${product}`);
    const createdCategories = await Category.create({
      // eslint-disable-next-line max-len
      name: category.data.name, description: category.data.description, itemMetadata: category.data.itemMetadata.map((itemMd) => JSON.stringify(itemMd)),
    });
    console.log(createdCategories.id);
    const iterItem = category.data.itemMetadata.map((i) => i.id);
    iterItem.map(async (itemName) => {
      await Item.destroy({
        truncate: true,
      });
      const item = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${itemName}`);
      const createdItems = await Item.create({
        // eslint-disable-next-line max-len
        categoryId: createdCategories.id, itemName: `${itemName}`, imageUrl: item.data.imageUrl, features: item.data.features.map((data) => JSON.stringify(data)),
      });
    });
    return createdCategories;
  });
};

const getFeature = async (category) => {
  const features = await Item.findAll({
    where: {
      itemName: {
        [Op.substring]: category, // LIKE '%category%'
      },
    },
    attributes: ['features'],
  });
  console.log(features);
};

module.exports = {
  postCategory,
  getFeature,
};

/* eslint-disable max-len */
const axios = require('axios').default;
const { Category } = require('../models');
const { Item } = require('../models');

const postCategory = async (categoriesArray) => {
  const res = [];
  categoriesArray.map(async (product) => {
    await Category.destroy({
      where: { name: `${product}s` },
    });
    let category;
    try {
      category = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${product}`);
      res.push(product);
    } catch (error) {
      console.log('fetch failed', error);
    }
    console.log('ll');

    const createdCategories = await Category.create({
      // eslint-disable-next-line max-len
      name: category.data.name, description: category.data.description, itemMetadata: category.data.itemMetadata.map((itemMd) => JSON.stringify(itemMd)),
    });
    const iterItem = category.data.itemMetadata.map((i) => i.id);
    iterItem.map(async (itemName) => {
      await Item.destroy({
        where: { category: `${product}s` },
      });
      const item = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${itemName}`);
      const createdItems = await Item.create({
        // eslint-disable-next-line max-len
        categoryId: createdCategories.id, category: createdCategories.name, itemName: `${itemName}`, imageUrl: item.data.imageUrl, features: item.data.features.map((data) => JSON.stringify(data)),
      });
    });
  });
  return res;
};

const getFeature = async (reqdCategory) => {
  const itemData = await Item.findAll({
    where: { category: reqdCategory },
  });
  const features = {
    Color: [],
    Size: [],
    Brand: [],
  };
  itemData.map((item) => {
    const feature = item.features;
    feature.map((i) => {
      const feat = (JSON.parse(i));
      if (feat.name === 'Color') {
        if (features.Color.indexOf(feat.value) === -1) { features.Color.push(feat.value); }
      } else if (feat.name === 'Size') {
        if (features.Size.indexOf(feat.value) === -1) features.Size.push(feat.value);
      } else if (feat.name === 'Brand') {
        if (features.Brand.indexOf(feat.value) === -1) features.Brand.push(feat.value);
      }
    });
  });
  return features;
};

const getItems = async (reqdCategory, features) => {
  const categoryItems = await Item.findAll({
    where: { category: reqdCategory },
  });

  if (features) {
    const productsSearched = categoryItems.filter((item) => item.features.some((feature) => features.includes(JSON.parse(feature).value)));
    if (productsSearched.length === 0) {
      return categoryItems;
    }
    const items = productsSearched.map((item) => item.itemName);
    return items;
  }
  return categoryItems;
};

module.exports = {
  postCategory,
  getFeature,
  getItems,
};

const categoryService = require('../services/category.service');

const createCategories = async (req, res) => {
//   console.log(req.body);
  const response = await categoryService.postCategory(req.body.names);
  console.log('mmeee', response);
  if (response) {
    res.status(201).json({ message: 'Added successfully' });
  } else {
    res.status(404).json({ message: 'No such category' });
  }
};

const getFeatures = async (req, res) => {
  const features = await categoryService.getFeature(req.params.category);
  res.status(200).json({ features });
};

const getItems = async (req, res) => {
  const Items = await categoryService.getItems(req.query.category, req.query.features);
  res.status(200).json({ Items });
};

module.exports = {
  createCategories,
  getFeatures,
  getItems,
};

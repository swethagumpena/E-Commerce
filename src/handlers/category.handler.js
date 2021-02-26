const categoryService = require('../services/category.service');

const createCategories = async (req, res) => {
//   console.log(req.body);
  await categoryService.postCategory(req.body.names);
  res.status(201).json({ message: 'Added successfully' });
};

const getFeatures = async (req, res) => {
  const features = await categoryService.getFeature(req.params.category);
  res.status(200).json();
};

module.exports = {
  createCategories,
  getFeatures,
};

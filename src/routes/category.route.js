const express = require('express');
const { createCategories, getFeatures } = require('../handlers/category.handler');

const router = express.Router();

router.post('/', createCategories);
router.get('/', getFeatures);

module.exports = {
  router,
};

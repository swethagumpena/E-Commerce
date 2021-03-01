const express = require('express');
const { createCategories, getFeatures, getItems } = require('../handlers/category.handler');

const router = express.Router();

router.post('/', createCategories);
router.get('/features/:category', getFeatures);
router.get('/items', getItems);

module.exports = {
  router,
};

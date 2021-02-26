const { default: axios } = require('axios');
const { Category } = require('../models'); // todos should be same as modelName in model->todos.js
const { Item } = require('../models');
const categoryService = require('./category.service');

describe('Category service', () => {
  it('should save categories and feattures in database', async () => {
    const mockResponse = {
      name: 'phones',
      description: 'phone shoes',
      itemMetadata: [
        {
          id: 'phone_1',
          name: 'iPhone 12',
          description: 'Apple manufactured with amazing camera.',
        },
      ],
    };
    jest.spyOn(axios, 'get').mockResolvedValue(mockValue);
  });
});

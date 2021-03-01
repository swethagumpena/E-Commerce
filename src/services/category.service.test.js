const { default: axios } = require('axios');
const { Category } = require('../models'); // todos should be same as modelName in model->todos.js
const { Item } = require('../models');
const categoryService = require('./category.service');

describe('Category service', () => {
  it('should save categories and features in database', async () => {
    const mockValue = {
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
    const mockURL = 'https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=phone';

    const mockApiCall = jest.spyOn(axios, 'get').mockResolvedValue('abc');

    await categoryService.postCategory(['phone', 'shoe']);
    expect(mockApiCall).toHaveBeenCalledWith(mockURL);
    const spyValue = jest.spyOn(Category, 'create').mockResolvedValue(mockValue);
    expect(spyValue).toHaveBeenCalledWith({
      // eslint-disable-next-line max-len
      name: 'phones',
      description: 'phone shoes',
      itemMetadata: [
        {
          id: 'phone_1',
          name: 'iPhone 12',
          description: 'Apple manufactured with amazing camera.',
        }],
    });
  });
});

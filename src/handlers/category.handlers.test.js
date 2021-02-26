const categoryHandler = require('./category.handler');
const categoryService = require('../services/category.service');
// anything which has await before it mock

describe('Category handler', () => {
  it('should set a status code 201 and add data to database', async () => {
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
    jest.spyOn(categoryService, 'postCategory').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockRequest = {
      body: {
        names: ['phone', 'shoe'],
      },
    };
    await categoryHandler.createCategories(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Added successfully' });
  });
});

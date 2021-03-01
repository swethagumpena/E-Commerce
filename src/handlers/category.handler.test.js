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

  it('should get features and return with a status code of 200', async () => {
    const mockRequest = {
      params: { category: 'phone' },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockValue = {
      features: {
        Color: ['Red', 'Cyan with black stripped'],
        Size: [10, 11.5],
        Brand: ['reebok', 'umbro'],
      },
    };
    jest.spyOn(categoryService, 'getFeature').mockResolvedValue(mockValue);
    await categoryHandler.getFeatures(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ features: mockValue });
  });

  it('should get items based on categories and features', async () => {
    const mockRequest = {
      query: { category: 'shoe', features: 'Black,10,Adidas' },
    };
    const mockItems = ['shoe_3'];
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    jest.spyOn(categoryService, 'getItems').mockResolvedValue(mockItems);
    await categoryHandler.getItems(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ Items: mockItems });
  });
});

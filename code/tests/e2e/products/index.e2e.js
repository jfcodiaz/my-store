const { text } = require("express");
const { e2e } = require("../../utils/e2e");
const { ADMIN, CUSTOMER, GUEST } = require("../../utils/users");
const { unauthorizedTest, unauthenticatedTest, paginationTest } = require("../common");
const { faker } = require("@faker-js/faker");
const CategoryService = require("../../../services/category.service");
const ProductsService = require("../../../services/product.service");
const { e2eGenericCrudTest } = require("../../utils/e2e-generic-crud-test");

const categoryService = new CategoryService();
const productService = new ProductsService();


e2eGenericCrudTest({
  title: '[Product] /api/v1/products',
  entitiesEndpoint: '/api/v1/products',
  entityEndpoint: '/api/v1/products/;id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: async () => {
    const  category = await categoryService.findOneRadom();
    return {
      name: faker.word.adjective(),
      description: faker.word.words(10),
      price: parseInt(faker.finance.amount()),
      image: faker.internet.url(),
      categoryId:  category.id
    }
  },
  _debug: (statusCode, body, text) => {
    console.log(statusCode, body, text);
  },
  create: {
    allowedUsers: [ADMIN],
    requireProperties: [
      'name', 'description', 'price'
    ],
    checkToBeSameProperties: [
      'id', 'name', 'description', 'price'
    ],
    loadEntity: async (id) => {
      return productService.findOne(id)
    }
  },
  read: {
    allowedUsers: [ADMIN, CUSTOMER],
    checkExistsProperties: [
      'id', 'name', 'description', 'price'
    ]
  }
})

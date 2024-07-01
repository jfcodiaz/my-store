const { faker } = require('@faker-js/faker');
const { CATEGORY_TABLE } = require('../models/category.model');

const getQueryIterface = (queryInterface) => {
  if (queryInterface.context) {
    queryInterface = queryInterface.context;
  }
  return queryInterface;
}

const seed = ({up: userUp, down: userDown} = {}) => {
  return {
    up: (queryInterface) => userUp(getQueryIterface(queryInterface)),
    down: (queryInterface) => userDown(getQueryIterface(queryInterface))
  }
};

module.exports = seed({
  up: async queryInterface => {
    const categories = [];
    for(let i = 0; i < 150; i++) {
      categories.push({
        name: faker.lorem.words({min: 4, max: 5}) + "_" + (new Date().getTime()),
        image: faker.internet.url(),
        created_at: new Date()
      });
    }

    return queryInterface.bulkInsert(CATEGORY_TABLE, categories);
  },
  down: async queryInterface =>  {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
});



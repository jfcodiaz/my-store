const updateTest = require('./update');
const paginationTest = require('./pagination');
const unauthorizedTest = require('./unauthorized');
const unauthenticatedTest = require('./unauthenticated');
const getOneTest = require('./get-one');

module.exports = {
  getOneTest,
  updateTest,
  paginationTest,
  unauthorizedTest,
  unauthenticatedTest,
}

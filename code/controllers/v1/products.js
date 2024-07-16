const { onlyAdmin, auth } = require('../../middlewares/auth.handler');
const { createProductValidator, getProductValidator, updateProductValidator } = require('../../schemas/product.schema');

module.exports = ({
  createEntity,
  readOneEntity,
  readAllEntity,
  updateEntity,
  destroyEntity,
  addController,
  productRepository
}) => addController('product', 'v1', [
  ['create', 'post', '/', ...onlyAdmin, createProductValidator, createEntity(productRepository)],
  ['readAll', 'get', '/', auth, readAllEntity(productRepository)],
  ['readOne', 'get', '/:id', auth, getProductValidator, readOneEntity(productRepository)],
  ['update', 'patch', '/:id', ...onlyAdmin, ...updateProductValidator, updateEntity(productRepository)],
  ['destroy', 'delete', '/:id', ...onlyAdmin, getProductValidator, destroyEntity(productRepository)]
]);

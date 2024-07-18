const { onlyAdmin, auth } = require('../../middlewares/auth.handler');

module.exports = ({
  createEntity,
  readOneEntity,
  readAllEntity,
  updateEntity,
  destroyEntity,
  addController,
  categoryRepository,
  categoryValidators
}) => addController('category', 'v1', [
  ['create', 'post', '/', ...onlyAdmin, categoryValidators.create, createEntity(categoryRepository)],
  ['readAll', 'get', '/', auth, readAllEntity(categoryRepository)],
  ['readOne', 'get', '/:id', auth, categoryValidators.get, readOneEntity(categoryRepository)],
  ['update', 'patch', '/:id', ...onlyAdmin, ...categoryValidators.update, updateEntity(categoryRepository)],
  ['destroy', 'delete', '/:id', ...onlyAdmin, categoryValidators.get, destroyEntity(categoryRepository)]
]);

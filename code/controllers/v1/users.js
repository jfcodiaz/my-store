const { onlyAdmin } = require('../../middlewares/auth.handler');
const { createUserValidator, getUserValidator, updateUserValidator } = require('../../schemas/user.schema');

module.exports = ({
  createEntity,
  readOneEntity,
  readAllEntity,
  updateEntity,
  destroyEntity,
  userRepository,
  addController
}) => addController('user', 'v1', [
  ['create', 'post', '/', ...onlyAdmin, createUserValidator, createEntity(userRepository)],
  ['readAll', 'get', '/', ...onlyAdmin, readAllEntity(userRepository)],
  ['readOne', 'get', '/:id', ...onlyAdmin, readOneEntity(userRepository)],
  ['update', 'patch', '/:id', ...onlyAdmin, ...updateUserValidator, updateEntity(userRepository)],
  ['destroy', 'delete', '/:id', ...onlyAdmin, getUserValidator, destroyEntity(userRepository)]
]);

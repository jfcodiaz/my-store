const { onlyAdmin, auth } = require('../../middlewares/auth.handler');

module.exports = ({
  createEntity,
  readOneEntity,
  readAllEntity,
  updateEntity,
  destroyEntity,
  addController,
  customerRepository,
  customerValidators
}) => addController('customer', 'v1', [
  ['create', 'post', '/', customerValidators.create, createEntity(customerRepository)],
  ['readAll', 'get', '/', auth, readAllEntity(customerRepository)],
  ['readOne', 'get', '/:id', auth, customerValidators.get, readOneEntity(customerRepository)],
  ['update', 'patch', '/:id', ...onlyAdmin, ...customerValidators.update, updateEntity(customerRepository)],
  ['destroy', 'delete', '/:id', ...onlyAdmin, customerValidators.get, destroyEntity(customerRepository)]
]);

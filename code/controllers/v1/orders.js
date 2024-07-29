const { onlyAdmin, onlyCustomer, auth } = require('../../middlewares/auth.handler');

module.exports = ({
  createEntity,
  readOneEntity,
  readAllEntity,
  updateEntity,
  destroyEntity,
  orderRepository,
  customerRepository,
  addController,
  boom
}) => addController('orders', 'v1', [
  ['create', 'post', '/', ...onlyCustomer, async (req, res, next) => {
    try {
      const customer = await customerRepository.findByUserId(req.user.sub);
      res.status(201).json(await orderRepository.create({
        customerId: customer.id
      }));
    } catch (error) {
      next(error);
    }
  }],
  ['readAll', 'get', '/', ...onlyAdmin, readAllEntity(orderRepository)],
  ['readOne', 'get', '/:id', ...onlyAdmin, readOneEntity(orderRepository)],
  ['destroy', 'delete', '/:id', auth, async (req, res, next) => {
    const order = await orderRepository.findOne(req.params.id);
    const customer = await customerRepository.findByUserId(req.user.sub);
    if (req.user.role !== 'admin' && (order.customerId !== customer.id)) {
      return next(boom.unauthorized());
    }
    return destroyEntity(orderRepository)(req, res, next);
  }]
]);
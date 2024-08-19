const { onlyCustomer, auth } = require('../../middlewares/auth.handler');

module.exports = ({
  readAllEntity,
  destroyEntity,
  orderRepository,
  customerRepository,
  addController,
  verifyOwnerOrRole,
  readOneEntity,
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
  ['readAll', 'get', '/', auth, async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        res.json(await orderRepository.getByUserPaginated(req.user.sub));
        return;
      }
      readAllEntity(orderRepository)(req, res, next);
    } catch (error) {
      next(error);
    }
  }],
  ['readOne', 'get', '/:id', auth,
    verifyOwnerOrRole({
      repository: orderRepository,
      roles: ['admin'],
      verifyProperty: async (entity, user) => {
        const costumer = await customerRepository.findByUserId(user.id);
        return entity.costumer_id === costumer.id;
      }
    }),
    readOneEntity(orderRepository)
  ],
  ['destroy', 'delete', '/:id', auth, async (req, res, next) => {
    const order = await orderRepository.findOne(req.params.id);
    const customer = await customerRepository.findByUserId(req.user.sub);
    if (req.user.role !== 'admin' && (order.customerId !== customer.id)) {
      return next(boom.unauthorized());
    }
    return destroyEntity(orderRepository)(req, res, next);
  }]
]);

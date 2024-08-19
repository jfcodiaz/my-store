const Repository = require('./common/repository');

class OrderRepository extends Repository {
  constructor ({ orderModel, container }) {
    super(orderModel, container);
  }

  #getFiltersByUser (userId) {
    const { Customer } = this.model.sequelize.models;
    return {
      include: [{
        model: Customer,
        as: 'customer',
        where: {
          user_id: userId
        }
      }]
    };
  }

  async getByUser (userId, { limit, offset } = {}) {
    const { Order } = this.model.sequelize.models;
    const filters = this.#getFiltersByUser(userId);

    return Order.findAll({
      ...filters,
      limit,
      offset
    });
  }

  async getByUserPaginated (userId, { page = 1, perPage = 10 } = {}) {
    const { Order } = this.model.sequelize.models;
    const offset = (page - 1) * perPage;
    const filters = this.#getFiltersByUser(userId);

    const paginate = this.container.resolve('paginate');
    return paginate({
      offset,
      perPage,
      currentPage: page,
      getEntities: () => Order.findAndCountAll({
        limit: perPage,
        offset,
        ...filters
      })
    });
  }
}

module.exports = OrderRepository;

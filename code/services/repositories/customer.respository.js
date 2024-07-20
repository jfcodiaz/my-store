const Repository = require('./common/respository');

class CustomerRepository extends Repository {
  #hash = null;
  constructor ({ customerModel, hash, container }) {
    super(customerModel, container);
    this.#hash = hash;
  }

  async create (data) {
    const hash = await this.#hash(data.user.password);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };

    const newCustomer = await this.model.create(newData, {
      include: ['user']
    });

    return await this.findOne(newCustomer.id);
  }
}

module.exports = CustomerRepository;

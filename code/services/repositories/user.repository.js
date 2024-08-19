const Repository = require('./common/repository');

class UserRepository extends Repository {
  #hash = null;
  constructor ({ userModel, hash, container }) {
    super(userModel, container);
    this.#hash = hash;
  }

  async create (data) {
    const hash = await this.#hash(data.password);
    return super.create({
      ...data,
      password: hash
    });
  }

  async findByEmail (email, options = { scope: 'defaultScope' }) {
    const user = await this.model.scope(options.scope).findOne({
      ...options,
      where: {
        email
      }
    });

    return user;
  }

  findByRole (role) {
    return this.model.findAll({
      where: {
        role
      }
    });
  }

  findFirstUserWithRole (role) {
    return this.model.findOne({
      where: { role }
    });
  }
}

module.exports = UserRepository;

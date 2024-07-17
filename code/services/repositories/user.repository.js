const Repository = require('./common/respository');

class UserRepository extends Repository {
  #hash = null;
  constructor ({ userModel, hash, respositoriesHelpers }) {
    super(userModel, respositoriesHelpers);
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

  findFirstUserWithRole (role) {
    return this.model.findOne({
      where: { role }
    });
  }
}

module.exports = UserRepository;

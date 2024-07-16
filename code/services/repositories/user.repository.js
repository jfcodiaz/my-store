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
}

module.exports = UserRepository;

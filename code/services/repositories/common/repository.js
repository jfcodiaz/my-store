class Repository {
  #boom = null;
  #model = null;
  #sequelize = null;
  #container = null;

  constructor (model, container) {
    this.#model = model;
    this.#boom = container.resolve('boom');
    this.#sequelize = container.resolve('sequelize');
    this.#container = container;
  }

  get model () {
    return this.#model;
  }

  get container () {
    return this.#container;
  }

  async create (data) {
    const entity = await this.#model.create(data);

    return this.findOne(entity.id);
  }

  async findOne (id, options = { scope: 'defaultScope' }) {
    const entity = await this.#model.scope(options.scope).findByPk(id, options);
    if (!entity) {
      throw this.#boom.notFound('user not found');
    }

    return entity;
  }

  async findAll ({
    page = 1,
    perPage = 10,
    pagination = true,
    absoluteUrl = false
  } = {}) {
    const offset = (page - 1) * perPage;
    if (pagination === false) {
      return this.#model.findAll();
    }

    const paginate = this.container.resolve('paginate');
    return paginate({
      offset,
      perPage,
      currentPage: page,
      getEntities: () => this.#model.findAndCountAll({
        limit: perPage,
        offset,
        absoluteUrl
      })
    });
  };

  findRandom () {
    return this.#model.findOne({
      order: [
        this.#sequelize.random()
      ]
    });
  }

  async update (id, data) {
    const enity = await this.findOne(id);

    return enity.update(data);
  }

  async delete (id) {
    const entity = await this.findOne(id);
    await entity.destroy();

    return { id };
  }

  getTotal () {
    return this.#model.count();
  }
}

module.exports = Repository;

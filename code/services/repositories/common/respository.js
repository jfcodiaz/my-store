class Repository {
  #model = null;
  #boom = null;
  #getAbsoluteUrl = null;
  #getBasePath = null;
  #sequelize = null;

  constructor (model, respositoriesHelpers) {
    this.#model = model;
    this.#boom = respositoriesHelpers.boom;
    this.#getAbsoluteUrl = respositoriesHelpers.getAbsoluteUrl;
    this.#getBasePath = respositoriesHelpers.getBasePath;
    this.#sequelize = respositoriesHelpers.sequelize;
  }

  get model () {
    return this.#model;
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

    const entities = await this.#model.findAndCountAll({
      limit: perPage,
      offset
    });

    const totalPage = Math.ceil(entities.count / perPage);
    const basePath = absoluteUrl ? this.#getAbsoluteUrl() : this.#getBasePath();
    const totalPages = Math.ceil(entities.count / perPage);
    const queryParams = `?per_page=${perPage}`;
    const currentPage = parseInt(page);

    return {
      total: entities.count,
      per_page: parseInt(perPage),
      current_page: parseInt(currentPage),
      last_page: totalPage,
      first_page_url: `${basePath}${queryParams}&page=1`,
      last_page_url: `${basePath}${queryParams}&page=${totalPages}`,
      next_page_url: currentPage < totalPages ? `${basePath}${queryParams}&page=${currentPage + 1}` : null,
      prev_page_url: currentPage > 1 ? `${basePath}${queryParams}&page=${currentPage - 1}` : null,
      path: basePath,
      from: offset + 1,
      to: offset + entities.rows.length,
      data: entities.rows
    };
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
}

module.exports = Repository;

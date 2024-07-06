const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const findAllBase = require('./repositories/common/find-all');

const { models } = sequelize;

class CategoryService {
  async create (data) {
    return await models.Category.create(data);
  }

  async findAll (args = {}) {
    return findAllBase({ model: models.Category, ...args });
  }

  findOne (id) {
    return new Promise((resolve, reject) => {
      models.Category.findByPk(id)
        .then(model => {
          if (!model) {
            reject(boom.notFound('category not found'));
          }
          resolve(model);
        });
    });
  }

  async update (id, data) {
    const model = await this.findOne(id);
    return model.update(data);
  }

  async delete (id) {
    const model = await this.findOne(id);
    return model.destroy();
  }

  findOneRadom = async () => {
    return models.Category.findOne({
      order: [
        sequelize.random()
      ]
    });
  };
}

module.exports = CategoryService;

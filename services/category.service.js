const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor(){

  }

  async create(data) {
    return await models.Category.create(data);
  }

  findAll() {
    return models.Category.findAll();
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      models.Category.findByPk(id)
        .then(model => {
          if(!model) {
            reject(boom.notFound('category not found'));
          }
          resolve(model);
        });
    });
  }

  async update(id, data) {
    const model = await this.findOne(id);
    return model.update(data);
  }

  async delete(id) {
    const model = await this.findOne(id);
    return model.destroy();
  }
}

module.exports = CategoryService;

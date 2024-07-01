const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
const { getBasePath, getAbsoluteUrl } = require('./get-base-path');

const { models }  = sequelize;
class CategoryService {
  constructor(){

  }

  async create(data) {
    return await models.Category.create(data);
  }

  async findAll({
    page = 1,
    per_page = 10,
    absoluteUrl = false,
    pagination = true
  } = {}) {
    const offset = (page - 1) * per_page;
    if(pagination === false){
      return models.Category.findAll();
    }

    const categories = await models.Category.findAndCountAll({
      limit: per_page,
      offset
    });

    const totalPage = Math.ceil(categories.count / per_page);
    const currentPage = parseInt(page);
    const basePath = absoluteUrl ? getAbsoluteUrl() : getBasePath();
    const totalPages = Math.ceil(categories.count / per_page);
    const queryParams = `?per_page=${per_page}`;

    return {
      total: categories.count,
      per_page: parseInt(per_page),
      current_page: parseInt(page),
      last_page: totalPage,
      first_page_url: `${basePath}${queryParams}&page=1`,
      last_page_url: `${basePath}${queryParams}&page=${totalPages}`,
      next_page_url: currentPage < totalPages ? `${basePath}${queryParams}&page=${currentPage + 1}` : null,
      prev_page_url: currentPage > 1 ? `${basePath}${queryParams}&page=${currentPage - 1}` : null,
      path: basePath,
      from: offset + 1,
      to: offset + categories.rows.length,
      data: categories.rows
    };
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

  findOneRadom = async () => {
    return models.Category.findOne({
      order: [
        sequelize.random()
      ]
    });
  }
}

module.exports = CategoryService;

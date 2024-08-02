const Repository = require('./common/repository');

class CategoryRepository extends Repository {
  constructor ({ categoryModel, container }) {
    super(categoryModel, container);
  }
}

module.exports = CategoryRepository;

const Repository = require('./common/respository');

class CategoryRepository extends Repository {
  constructor ({ categoryModel, container }) {
    super(categoryModel, container);
  }
}

module.exports = CategoryRepository;

const Repository = require('./common/repository');

class ProductRepository extends Repository {
  constructor ({ productModel, container }) {
    super(productModel, container);
  }
}

module.exports = ProductRepository;

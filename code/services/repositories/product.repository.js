const Repository = require('./common/respository');

class ProductRepository extends Repository {
  constructor ({ productModel, container }) {
    super(productModel, container);
  }
}

module.exports = ProductRepository;

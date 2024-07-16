const Repository = require('./common/respository');

class ProductRepository extends Repository {
  constructor ({ productModel, respositoriesHelpers }) {
    super(productModel, respositoriesHelpers);
  }
}

module.exports = ProductRepository;

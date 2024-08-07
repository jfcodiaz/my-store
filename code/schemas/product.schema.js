const Joi = require('joi');
const validatorHandler = require('../middlewares/validator.handler');

const id = Joi.number().integer();

const image = Joi.string().uri();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  description: description.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  categoryId,
  description
});

const getProductSchema = Joi.object({
  id: id.required()
});

const getValidatorProduct = validatorHandler(getProductSchema, 'params');

module.exports = {
  getProductValidator: getValidatorProduct,
  createProductValidator: validatorHandler(createProductSchema, 'body'),
  updateProductValidator: [validatorHandler(updateProductSchema, 'body'), getValidatorProduct]
};

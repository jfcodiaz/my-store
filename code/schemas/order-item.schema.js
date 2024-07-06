const Joi = require('joi');

const amount = Joi.number().integer().min(1);
const productId = Joi.number().integer();

const addItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required()
});

module.exports = {
  addItemSchema
};

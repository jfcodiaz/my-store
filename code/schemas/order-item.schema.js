const Joi = require('joi');

const productId =  Joi.number().integer();
const amount = Joi.number().integer().min(1);

const addItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required()
});

module.exports = {
  addItemSchema
}

const Joi = require('joi');

const id = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required()
});

module.exports = {
  getOrderSchema
};

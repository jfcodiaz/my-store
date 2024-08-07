const Joi = require('joi');
const validatorHandler = require('../middlewares/validator.handler');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(30);
const lastName = Joi.string();

const email = Joi.string().email();
const password = Joi.string();

const phone = Joi.string();
const userId = Joi.number().integer();
const getCustomerSchema = Joi.object({
  id: id.required()
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  }),
  phone: phone.required()
});

const updateCustomerSchema = Joi.object({
  name, lastName, phone, userId
});

const idValidator = validatorHandler(getCustomerSchema, 'params');

module.exports = {
  create: validatorHandler(createCustomerSchema, 'body'),
  update: [validatorHandler(updateCustomerSchema, 'body'), idValidator],
  get: idValidator
};

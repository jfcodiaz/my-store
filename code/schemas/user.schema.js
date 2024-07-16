const Joi = require('joi');
const validator = require('../middlewares/validator.handler');

const id = Joi.number().integer();

const role = Joi.string().min(5);
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email,
  password,
  role
});

const getUserSchema = Joi.object({
  id: id.required()
});

const getValidator = validator(getUserSchema, 'params');

module.exports = {
  getUserSchema,
  getUserValidator: getValidator,
  createUserValidator: validator(createUserSchema, 'body'),
  updateUserValidator: [validator(updateUserSchema, 'body'), getValidator]
};

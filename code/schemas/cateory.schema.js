const Joi = require('joi');
const validatorHandler = require('../middlewares/validator.handler');

const id = Joi.number().integer();

const image = Joi.string().uri();
const name = Joi.string().min(3).max(150);

const createValidator = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateValidator = Joi.object({
  name, image
});

const getValidator = Joi.object({
  id: id.required()
});

const idValidator = validatorHandler(getValidator, 'params');

module.exports = {
  create: validatorHandler(createValidator, 'body'),
  update: [validatorHandler(updateValidator, 'body'), idValidator],
  get: idValidator
};

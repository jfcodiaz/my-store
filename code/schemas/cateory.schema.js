const Joi = require('joi');

const id = Joi.number().integer();

const image = Joi.string().uri();
const name = Joi.string().min(3).max(150);

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name, image
});

const getCategorySchema = Joi.object({
  id: id.required()
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };

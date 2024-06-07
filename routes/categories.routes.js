const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/cateory.schema');
const CategoryService = require('./../services/category.service');
router = express.Router();
const service = new CategoryService();

router.post('/',
  async(req, res, next) => {
    try {
      const entity = await service.create(req.body);
      res.json( {
        success: true,
        entity
      });
    } catch (error) {
      next(error)
    }

});

router.get('/', async(req, res, next) => {
  try {
    res.json(await service.findAll());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      res.json(await service.findOne(req.params.id));
    } catch (error) {
      next(error)
    }
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async(req, res, next) => {
    try {
      res.json(await service.update(
        req.params.id,
        req.body
      ));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {

      res.json(await service.delete(req.params.id));
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;

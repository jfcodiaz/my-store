const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/cateory.schema');

const router = express.Router();
const service = new CategoryService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCategorySchema, 'body'),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const entity = await service.create(req.body);
      res.status(201).json({
        success: true,
        entity
      });
    } catch (error) {
      next(error);
    }
  });

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) => {
    try {
      const { page = 1, per_page: perPage = 10, pagination } = req.query;
      res.json(await service.findAll({
        page,
        perPage,
        pagination: pagination !== 'false'
      }));
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  checkRoles('admin', 'seller'),
  async (req, res, next) => {
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
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  checkRoles('admin', 'seller'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(204).json(null);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

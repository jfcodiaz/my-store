const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema');
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const router = express.Router();

const service = new ProductsService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const products = await service.findAll();
      res.json(products)
    } catch(error) {
      next(error)
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product);
    } catch (error) {
      next(error)
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json(null);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;

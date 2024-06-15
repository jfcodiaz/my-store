const express = require('express');
const { CustomerService } = require('./../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema');
const { checkRoles } = require('./../middlewares/auth.handler');
const passport = require('passport');
const router = express.Router();
const service = new CustomerService();

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body))
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json(await service.findAll())
    } catch (error) {
        next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id))
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;
      res.status(201).json(await service.update(id, data));
    } catch (error) {
      next(error)
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({
        success: true
      })
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;

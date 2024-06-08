const express = require('express');

const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema } = require('./../schemas/order.schema');
const {OrderService} = require('./../services/orders.service');

const service = new OrderService();

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(await service.create(req.body));
    } catch(error) {
      next(error);
    }
});

router.get('/',
  async (req, res, next) => {
    try {
      res.json(await service.findAll());
    } catch(error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getOrderSchema),
  async (req, res, next) => {
    try {
      res.json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getOrderSchema),
  async (req, res, next) => {
    try {
      res.status(204).json(await service.delete(req.params.id));
    } catch(error) {
      next(error);
    }
  });

module.exports = router;

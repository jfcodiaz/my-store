const express = require('express');

const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema } = require('./../schemas/order.schema');
const passport = require('passport');
const {OrderService} = require('./../services/orders.service');
const { addItemSchema } = require('../schemas/order-item.schema');

const service = new OrderService();

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(await service.create(req.body));
    } catch(error) {
      next(error);
    }
});

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      res.json(await service.findAll());
    } catch(error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema),
  async (req, res, next) => {
    try {
      res.json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    }
  });

router.post('/:orderId/items',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(
        await service.addItem(req.params.orderId, req.body)
      );
    } catch (error) {
      next(error);
    }

  }
)

router.delete('/:orderId/items/:itemId',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next) => {
    try {
      await service.removeItem(
        req.params.orderId,
        req.params.itemId
      );
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema),
  async (req, res, next) => {
    try {
      res.status(204).json(await service.delete(req.params.id));
    } catch(error) {
      next(error);
    }
  });



module.exports = router;

const express = require('express');
const passport = require('passport');
const { container } = require('./../container');
const orderRepository = container.resolve('orderRepository');
const router = express.Router();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await orderRepository.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

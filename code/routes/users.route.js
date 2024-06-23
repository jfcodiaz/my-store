const expres = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/user.schema');
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');

const router = expres.Router();

const service = new UserService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next)=> {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async(req, res, next)=> {
    try {
      const { id } = req.params;
      const user = await service.findOne(parseInt(id, 10));
      res.json(user);
    } catch (error) {
      next(error)
    }
});

router.post('/',
  checkRoles('admin'),
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createUserSchema, 'body'),
  async(req, res, next)=> {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema,'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateUser = await service.update(id, data);
      res.json(updateUser);
    } catch (error) {
      next(error)
    }

  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async(req, res, next)=> {
    try {
      const {id} = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
     next(error);
    }
  }
);

module.exports = router;

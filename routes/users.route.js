const expres = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

router = expres.Router();

const service = new UserService();

router.get('/', async(req, res, next)=> {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
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
  validatorHandler(getUserSchema, 'params'),
  async(req, res, next)=> {
    try {
      const {id} = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
     next(error)
    }
  }
);

module.exports = router;

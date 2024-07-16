module.exports = (repository) => async (req, res, next) => {
  try {
    const body = req.body;
    const entity = await repository.create(body);

    res.status(201).json(entity);
  } catch (e) {
    next(e);
  }
};

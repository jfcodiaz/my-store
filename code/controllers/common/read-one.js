module.exports = (repository) => {
  return async (req, res) => {
    const { id } = req.params;
    const product = await repository.findOne(id);

    res.json(product);
  };
};

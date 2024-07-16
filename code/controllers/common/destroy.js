module.exports = (repository) => {
  return async (req, res) => {
    const { id } = req.params;
    await repository.delete(id);

    res.status(204).json(null);
  };
};

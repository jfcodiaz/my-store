module.exports = (repository) => {
  return async (req, res) => {
    const { page = 1, per_page: perPage = 10, pagination } = req.query;
    res.json(await repository.findAll({
      page,
      perPage,
      pagination: pagination !== 'false'
    }));
  };
};

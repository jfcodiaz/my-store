const paginate = require('../../paginate');

module.exports = ({
  model,
  page = 1,
  perPage = 10,
  pagination = true,
  absoluteUrl = false
} = {}) => {
  const offset = (page - 1) * perPage;
  if (pagination === false) {
    return model.findAll();
  }

  return paginate({
    getEntities: async () => {
      return model.findAndCountAll({
        limit: perPage,
        offset
      });
    },
    offset,
    perPage,
    absoluteUrl,
    currentPage: parseInt(page)
  });
};

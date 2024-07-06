const paginate = require("../../paginate");

module.exports = ({
  page = 1,
  per_page = 10,
  absoluteUrl = false,
  pagination = true,
  model
} = {}) => {
  const offset = (page - 1) * per_page;
  if(pagination === false){
    return model.findAll();
  }

  return paginate({
    getEntities: async () => {
      return model.findAndCountAll({
        limit: per_page,
        offset
      })
    },
    offset,
    perPage: per_page,
    currentPage: parseInt(page),
    absoluteUrl
  });
}

/*
async _findAll() {

}*/

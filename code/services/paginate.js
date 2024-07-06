const { getAbsoluteUrl, getBasePath } = require("./get-base-path");

module.exports = async ({
  offset,
  currentPage,
  perPage,
  getEntities,
  absoluteUrl
} = {}) => {
  const entities = await getEntities();

  const totalPage = Math.ceil(entities.count / perPage);
  const basePath = absoluteUrl ? getAbsoluteUrl() : getBasePath();
  const totalPages = Math.ceil(entities.count / perPage);
  const queryParams = `?per_page=${perPage}`;

  return {
    total: entities.count,
    per_page: parseInt(perPage),
    current_page: parseInt(currentPage),
    last_page: totalPage,
    first_page_url: `${basePath}${queryParams}&page=1`,
    last_page_url: `${basePath}${queryParams}&page=${totalPages}`,
    next_page_url: currentPage < totalPages ? `${basePath}${queryParams}&page=${currentPage + 1}` : null,
    prev_page_url: currentPage > 1 ? `${basePath}${queryParams}&page=${currentPage - 1}` : null,
    path: basePath,
    from: offset + 1,
    to: offset + entities.rows.length,
    data: entities.rows
  };
}

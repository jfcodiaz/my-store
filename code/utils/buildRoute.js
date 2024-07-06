const buildRoute = (baseRoute, params = {}, args = {}) => {
  let route = baseRoute;
  Object.keys(params).forEach(key => {
    route = route.replace(`:${key}`, params[key]);
  });

  const queryParams = new URLSearchParams(args).toString();
  if (queryParams) {
    route += `?${queryParams}`;
  }

  return route;
};

module.exports = buildRoute;

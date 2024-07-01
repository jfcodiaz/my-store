let request;
const url = require('url');

const getBasePathMiddlewares = (req, _res, next) => {
  request = req;
  next();
};

const getAbsoluteUrl = () => {
  const host = request.get('host');
  return url.format({
    protocol: request.protocol,
    host: host,
    pathname: getBasePath()
  });
}

const getBasePath = () => {
  if(!request) {
    throw new Error("The service has not been initialized correctly.");
  }

  return request.baseUrl + request.path;
}

module.exports = {
  getBasePath,
  getAbsoluteUrl,
  getBasePathMiddlewares
}

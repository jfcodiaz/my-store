const request = async ({
  suite,
  url,
  method = 'get',
  data = {},
  headers = {}
} = {}) => {
  const _headers = { ...headers };
  if (suite.getSelectedUser()?.token) {
    _headers['Authorization'] = `Bearer ${ suite.getSelectedUser().token }`;
  }

  return suite.getApi()[method](url).set(_headers).send(data);
}

const get = ({ suite, url, headers = {} } = {}) => {
  return request({ suite, url, headers, method: 'get' });
}

const post = ({ suite, url, data = {}, headers = {} } = {}) => {
  return request({ suite, url, data, headers, method: 'post' });
}

const put = ({ suite, url, data = {}, headers = {} } = {}) => {
  return request({ suite, url, data, headers, method: 'put' });
}

const patch = ({ suite, url, data = {}, headers = {} } = {}) => {
  return request({ suite, url, data, headers, method: 'patch' });
}

const remove = ({ suite, url, data = {}, headers = {} } = {}) => {
  return request({ suite, url, data, headers, method: 'delete' });
}

module.exports = {
  request,
  get,
  post,
  put,
  patch,
  remove
};

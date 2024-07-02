const { post, get, put, patch, remove } = require('./request');

class SuiteE2E {
  #user = null;
  #api = null;
  #endpoint = null;
  #users = {};
  #userLoadFunctions = null;
  #endpoints = {};
  #buildeRoute = null;

  constructor(userLoadFunctions, builderRoute) {
    this.#userLoadFunctions = userLoadFunctions;
    this.#buildeRoute = builderRoute
  }

  async loadUser(alias) {
    if(this.#users[alias] === undefined) {
      this.#users[alias] = await this.#userLoadFunctions[alias]();
    }

    return this.#users[alias];
  }

  as(alias) {
    this.#user = this.#users[alias];

    return this;
  }

  addEndpoint(alias, enpoint) {
    this.#endpoints[alias] = enpoint;

    return this;
  }

  setEndpoint(alias, params = {}, args = {}) {
    this.#endpoint = this.#buildeRoute(this.#endpoints[alias], params, args);

    return this;
  }

  getUser(alias) {
    return this.#users[alias].user;
  }

  getSelectedUser(){
    return this.#user;
  }

  getApi() {
    return this.#api;
  }

  setApi(api) {
    this.#api = api;

    return this;
  }

  post = (options) => post({ suite: this, url: this.#endpoint, ...options });
  get = (options) => get({ suite: this, url: this.#endpoint, ...options });
  put = (options) => put({ suite: this, url: this.#endpoint, ...options });
  patch = (options) => patch({ suite: this, url: this.#endpoint, ...options });
  delete = (options) => remove({ suite: this, url: this.#endpoint,...options });

  asGuest() {
    this.#user = null;

    return this;
  }
}

module.exports = SuiteE2E;

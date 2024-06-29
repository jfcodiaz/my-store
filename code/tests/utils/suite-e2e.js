const { post, get, put, patch, remove } = require('./request');

class SuiteE2E {
  #user = null;
  #api = null;
  #users = {};
  #userLoadFunctions = null;

  constructor(userLoadFunctions) {
    this.#userLoadFunctions = userLoadFunctions;
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
    return this.#api = api;
  }

  post = (url, options) => post({ suite: this, url, ...options });
  get = (url, options) => get({ suite: this, url, ...options });
  put = (url, options) => put({ suite: this, url, ...options });
  patch = (url, options) => patch({ suite: this, url, ...options });
  delete = (url, options) => remove({ suite: this, url, ...options });

  asGuest() {
    this.#user = null;

    return this;
  }
}

module.exports = SuiteE2E;

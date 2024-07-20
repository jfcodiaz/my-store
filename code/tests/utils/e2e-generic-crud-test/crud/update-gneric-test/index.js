const { GUEST } = require('../../../users');
const updateAnyTest = require('./update-any-test.js');
const unauthenticated = require('../../../../e2e/common/unauthenticated');

module.exports = ({
  debug,
  suite,
  buildData,
  entityEndpoint,
  repository,
  update,
  getParams = () => {},
  getArgumets = () => {}
} = {}) => {
  describe(`[PATCH] / ${entityEndpoint}`, () => {
    updateAnyTest({
      repository,
      buildData,
      update,
      suite,
      getParams,
      getArgumets,
      debug
    });

    if (!update.usersCanUpdateAny.includes(GUEST)) {
      unauthenticated({
        suite,
        getParams,
        getArgumets,
        entityEndpoint,
        debug
      });
    }
  });
};

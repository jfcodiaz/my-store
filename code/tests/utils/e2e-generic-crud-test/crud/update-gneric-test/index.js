const updateAnyTest = require('./update-any-test');

module.exports = ({
  suite,
  buildData,
  getParams,
  entityEndpoint,
  EntityRepository,
  update,
  getArgumets = () => {}
} = {}) => {
  describe(`[PATCH] / ${entityEndpoint}`, () => {
    updateAnyTest({
      EntityRepository,
      buildData,
      update,
      suite,
      getParams,
      getArgumets
    });
  });
};

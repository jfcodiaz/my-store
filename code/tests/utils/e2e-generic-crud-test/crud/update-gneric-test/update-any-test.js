const expectToBeNotSameArrayProps = require('../../../expects/to-be-not-same-array-props');
const expectToBeSameArrayProp = require('../../../expects/to-be-same-array-prop');
const { container } = require('./../../../../../container');
const logger = container.resolve('logger');

module.exports = ({
  suite,
  debug,
  update,
  buildData,
  getParams,
  getArgumets,
  repository
} = {}) => {
  update.usersCanUpdateAny.forEach(as => {
    test(`Update ${repository.model.modelName} as  ${as}`, async () => {
      const [entity, data] = await Promise.all([
        repository.findRandom(),
        buildData(true)
      ]);
      const keys = update.checkShouldBeUpdatedPropeties || Object.keys(data);
      suite
        .setEndpoint(
          'entity',
          await getParams(entity),
          await getArgumets(entity)
        )
        .as(as);
      const { statusCode, body, text } = await suite.patch({ data });
      debug && logger.info({ statusCode, body, text });
      const updateEntity = await repository.findOne(entity.id);
      expect(statusCode).toBe(200);
      expectToBeNotSameArrayProps(keys, entity, updateEntity);
      expectToBeSameArrayProp(keys, data, body);
      expectToBeSameArrayProp(keys, data, updateEntity.dataValues);
    });
  });
};

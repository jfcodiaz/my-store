const expectToBeNotSameArrayProps = require('../../../expects/to-be-not-same-array-props');
const expectToBeSameArrayProp = require('../../../expects/to-be-same-array-prop');

module.exports = ({
  suite,
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
        buildData()
      ]);
      const keys = update.checkShouldBeUpdatedPropeties || Object.keys(data);
      suite
        .setEndpoint(
          'entity',
          await getParams(entity),
          await getArgumets(entity)
        )
        .as(as);
      const { statusCode, body } = await suite.patch({ data });
      const updateEntity = await repository.findOne(entity.id);
      expect(statusCode).toBe(200);
      expectToBeNotSameArrayProps(keys, entity, updateEntity);
      expectToBeSameArrayProp(keys, data, body);
      expectToBeSameArrayProp(keys, data, updateEntity.dataValues);
    });
  });
};

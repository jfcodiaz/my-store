const capitalize = require('capitalize');

const deleteGenericTest = ({
  as,
  suite,
  deleteEntity,
  entityEndpoint,
  repository,
  getParams = () => new Promise(resolve => resolve()),
  getArgumets = () => new Promise(resolve => resolve())
} = {}) => {
  describe(`[DELETE] / ${entityEndpoint}`, () => {
    if (deleteEntity.usersWhoCanOnlyDeleteOwnEntities) {
      const getData = async () => {
        const data = {};
        const promises = deleteEntity.usersWhoCanOnlyDeleteOwnEntities.map(async (alias) => {
          const user = await suite.loadUser(alias);
          const entities = await repository.getByUser(user.user.id, { limit: 2 });
          data[alias] = {
            user,
            entities
          };
        });
        await Promise.all(promises);
        return data;
      };

      const user = deleteEntity.usersWhoCanOnlyDeleteOwnEntities[0];
      test(`${capitalize(user)} should not allow to delete an ${repository.model.name} they do not own`, async () => {
        const data = await getData();
        const alias = Object.keys(data);
        const [user, user2] = alias;
        const entity = data[user2].entities[0];
        suite.as(user);
        suite.setEndpoint(
          'entity',
          await getParams(entity),
          await getArgumets(entity)
        );
        const { statusCode } = await suite.delete();
        expect(statusCode).toBe(401);
        const entityDB = await repository.findOne(entity.id);
        expect(entityDB).not.toBeNull();
      });

      test(`${capitalize(user)} should be able to delete their own ${repository.model.name}`, async () => {
        const data = await getData();
        const alias = Object.keys(data);
        const [user] = alias;
        const entity = data[user].entities[0];
        suite.as(user);
        suite.setEndpoint(
          'entity',
          await getParams(entity),
          await getArgumets(entity)
        );
        const { statusCode } = await suite.delete();
        expect(statusCode).toBe(204);
        await expect(repository.findOne(entity.id)).rejects.toThrow('not found');
      });
    }

    deleteEntity.usersCanDeleteAny.forEach(as => {
      test(`${capitalize(as)} should delete any ${repository.model.name}`, async () => {
        const entity = await repository.findRandom();
        suite
          .setEndpoint(
            'entity',
            await getParams(entity),
            await getArgumets(entity)
          )
          .as(as);
        const { statusCode } = await suite.delete();
        expect(statusCode).toBe(204);
        await expect(repository.findOne(entity.id)).rejects.toThrow('not found');
      });
    });
  });
};

module.exports = deleteGenericTest;

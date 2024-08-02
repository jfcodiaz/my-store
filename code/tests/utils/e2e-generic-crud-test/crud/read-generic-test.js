const { paginationTest, unauthenticatedTest, getOneTest } = require('../../../e2e/common');
const pluralize = require('pluralize');
const { GUEST } = require('../../users');
const { resetSeed } = require('../../umzug');

const getTotalAllEntitesGeneric = (repository) => {
  return () => repository.getTotal();
};

const readGenericTest = async ({
  entityName,
  repository,
  suite,
  read,
  users,
  findRandomEntity,
  getTotalAllEntities = null
} = {}) => {
  describe('[GET] /', () => {
    beforeAll(async () => {
      await resetSeed();
    });

    if (read.usersOnlyCanReadOwnEntities) {
      const alias = read.usersOnlyCanReadOwnEntities;
      const title = `Users (${alias.join(', ')}) should only read their ${pluralize(repository.model.name)}`;
      test(title, async () => {
        const data = {};
        const promises = read.usersOnlyCanReadOwnEntities.map(async (alias) => {
          const user = await suite.loadUser(alias);
          const entities = await repository.getByUser(user.user.id);
          data[alias] = {
            user,
            entities
          };
        });
        await Promise.all(promises);
        const response = read.usersOnlyCanReadOwnEntities.map(async (alias) => {
          suite.setEndpoint('entities');
          suite.as(alias);
          const { body, text, codeStatus } = await suite.get();
          data[alias].response = { body, text, codeStatus };
        });
        await Promise.all(response);
        Object.values(data).forEach(data => {
          const { entities, response } = data;
          expect(response.body.total).toBe(entities.length);
        });
      });
    }

    read.usesCanReadAllPaginated.forEach(allowedUser => {
      paginationTest({
        title: `Get all ${pluralize(entityName)} with pagination as ${allowedUser}`,
        suite,
        as: allowedUser,
        getExpectedTotal: getTotalAllEntities || getTotalAllEntitesGeneric(repository)

      });
    });

    if (!read.usesCanReadAllPaginated.includes(GUEST)) {
      unauthenticatedTest({
        suite,
        title: `Response Unauthroized when request all ${pluralize(entityName)} paginated whit unauthenticated`
      });
    }
    read.usesCanReadAllAnyOne.forEach(allowedUser => {
      getOneTest({
        suite,
        title: `Get one as ${allowedUser}`,
        as: allowedUser,
        endpoint: 'entity',
        loadEntityFn: async () => {
          const entity = await findRandomEntity();
          return entity;
        },
        expects: async (entity, body) => {
          expect(entity.id).toBe(body.id);
          expect(entity.name).toBe(body.name);
          expect(entity.description).toBe(body.description);
          expect(entity.price).toBe(body.price);
        }
      });
    });

    if (!read.usesCanReadAllAnyOne.includes(GUEST)) {
      unauthenticatedTest({
        suite,
        title: `Response Unauthroized when request one ${entityName} unauthenticated`,
        endpoint: 'entity',
        loadEntityFn: async () => {
          const entity = await findRandomEntity();
          return entity;
        }
      });
    }
  });
};

module.exports = readGenericTest;

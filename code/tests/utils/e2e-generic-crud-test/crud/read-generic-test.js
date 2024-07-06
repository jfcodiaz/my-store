const { paginationTest, unauthenticatedTest, getOneTest } = require('../../../e2e/common');
const pluralize = require('pluralize');
const { GUEST } = require('../../users');

const readGenericTest = async ({
  entityName,
  suite,
  read,
  users,
  findRandomEntity
} = {}) => {
  describe('[GET] /', () => {
    read.usesCanReadAllPaginated.forEach(allowedUser => {
      paginationTest({
        title: `Get all ${pluralize(entityName)} with pagination as ${allowedUser}`,
        suite,
        as: allowedUser
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

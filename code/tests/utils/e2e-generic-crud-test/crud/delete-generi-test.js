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
    deleteEntity.usersCanDeleteAny.forEach(as => {
      test(`Delete Generic Test ${entityEndpoint}`, async () => {
        const entity = await repository.findRandom();
        suite
          .setEndpoint(
            'entity',
            await getParams(entity),
            await getArgumets(entity)
          )
          .as(as);
        await suite.delete();
        await expect(repository.findOne(entity.id)).rejects.toThrow('not found');
      });
    });
  });
};

module.exports = deleteGenericTest;

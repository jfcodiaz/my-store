const deleteGenericTest = ({
  as,
  suite,
  deleteEntity,
  entityEndpoint,
  EntityRepository,
  getParams = () => new Promise(resolve => resolve()),
  getArgumets = () => new Promise(resolve => resolve())
} = {}) => {
  deleteEntity.usersCanDeleteAny.forEach(as => {
    test(`Delete Generic Test ${entityEndpoint}`, async () => {
      const repository = new EntityRepository();
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
};

module.exports = deleteGenericTest;

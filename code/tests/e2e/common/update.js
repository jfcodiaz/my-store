module.exports = ({
  suite,
  title = 'Update',
  as,
  data: dataFn = () => ({}),
  getEntity,
  reloadEntity,
  expectsEquals = []
} = {}) => {
  if (typeof dataFn !== 'function' || typeof getEntity !== 'function' || typeof reloadEntity !== 'function') {
    throw new Error('dataFn, getEntity, and reloadEntity must be functions');
  }
  if (!Array.isArray(expectsEquals)) {
    throw new Error('expectsEquals must be an array');
  }

  test(title, async () => {
    try {
      const data = dataFn();
      const entity = await getEntity();
      const { statusCode, body } = await suite.as(as).patch({ data });
      const updatedEntity = await reloadEntity();

      expect(statusCode).toBe(200);
      expect(body.id).toBe(entity.id);
      expect(updatedEntity.id).toBe(entity.id);

      expectsEquals.forEach(key => {
        expect(body[key]).toBe(data[key]);
        expect(updatedEntity[key]).toBe(data[key]);
        expect(entity[key]).not.toBe(data[key]);
      });
    } catch (error) {
      console.error('Error in test:', error);
      throw error;
    }
  });
};

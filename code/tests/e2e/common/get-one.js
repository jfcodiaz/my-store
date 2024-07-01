module.exports = ({
  suite,
  title = 'Get one',
  user,
  loadEntityFn,
  endpoint = null,
  getParams = async (entity) => {
    return {
      id: entity.id
    }
  },
  getArgumets = async () => ({}),
  expects = async(entity, body) => {
    Object.keys(entity.dataValues).forEach(key => {
      expect(body[key]).toBe(entity[key]);
    });
  }
} = {}) => {
  test(title, async () => {
    const entity = await loadEntityFn();
    const { statusCode, body } = await suite.setEndpoint(
      endpoint,
      await getParams(entity),
      await getArgumets(entity)
    ).get()
    expect(statusCode).toBe(200);
    await expects(entity, body);
  });
}

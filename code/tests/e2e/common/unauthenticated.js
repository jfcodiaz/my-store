module.exports = ({
  title = 'Response Unauthroized when Request Unauthenticated',
  suite,
  method = 'get',
  loadEntityFn,
  endpoint = null,
  getParams = async (entity) => {
    return {
      id: entity.id
    }
  },
  getArgumets = async () => ({}),
  data = {}
} = {}) => {
  test(title, async () => {
    if(endpoint) {
      const entity = await loadEntityFn();
      suite.setEndpoint(
        endpoint,
        await getParams(entity),
        await getArgumets(entity)
      );
    }
    const {statusCode, text } = await suite.asGuest()[method]({ data });
    expect(statusCode).toBe(401);
    expect(text).toMatch(/Unauthorized/);
  });
}

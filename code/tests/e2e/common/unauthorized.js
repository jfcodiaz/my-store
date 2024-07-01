module.exports = ({
  title = 'Response Unauthroized',
  as: user,
  suite,
  method,
  data = {}
} = {}) => {
  test(title, async () => {
    const {statusCode, text } = await suite.as(user)[method]({ data });
    expect(statusCode).toBe(401);
    expect(text).toMatch(/Unauthorized/);
  });
}

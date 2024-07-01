module.exports = ({
  title = 'Response Unauthroized when Request Unauthenticated',
  suite,
  method = 'get',
  data = {}
} = {}) => {
  test(title, async () => {
    const {statusCode, text } = await suite.asGuest()[method]({ data });
    expect(statusCode).toBe(401);
    expect(text).toMatch(/Unauthorized/);
  });
}

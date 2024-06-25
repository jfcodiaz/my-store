const { e2e } = require('./../utils/e2e');

e2e('Test for home', (suite) => {
  test('GET /', async () => {
    const response = await suite.api.get('/');
    expect(response.text).toMatch(/Hola/);
    expect(response.statusCode).toEqual(200)
  });
});

const { e2e } = require('./../utils/e2e');

e2e({
  title: 'Test for home',
  tests: (suite) => {
    test('GET /', async () => {
      const response = await suite.api.get('/');
      expect(response.text).toMatch(/Hola/);
      expect(response.statusCode).toEqual(200);
    });
  }
});

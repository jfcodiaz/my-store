const { e2e } = require('./../utils/e2e');

e2e({
  title: 'Test for home',
  tests: (suite) => {
    test('GET /', async () => {
      suite
        .addEndpoint('home','/')
        .setEndpoint('home');
      const response = await suite.asGuest().get();
      expect(response.text).toMatch(/Hola/);
      expect(response.statusCode).toEqual(200);
    });
  }
});

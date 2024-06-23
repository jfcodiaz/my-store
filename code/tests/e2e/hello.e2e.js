const { config } = require("../../config/config");

describe('Test Fake', () => {
  test('port in test is 3001', () => {
    console.log(config.dbUrl);
    expect(config.port).toEqual('3001');
  });
})

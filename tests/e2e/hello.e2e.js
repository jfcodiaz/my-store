const { config } = require("../../config/config");

describe('Test Fake', () => {
  test('port in test is 3001', () => {
    console.log();
    expect(config.port).toEqual('3001');
  });
})

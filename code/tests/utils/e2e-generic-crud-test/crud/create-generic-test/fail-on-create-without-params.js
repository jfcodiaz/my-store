const { container } = require('../../../../../container');

const logger = container.resolve('logger');

module.exports = (entityName, suite, create, debug) => {
  const { testTryCreateWithOutParames } = create;
  if (testTryCreateWithOutParames === false || testTryCreateWithOutParames === undefined) {
    return;
  }
  create.allowedUsers.forEach(async alloweUser => {
    test(`Should fail on create ${entityName} as ${alloweUser} without params`, async () => {
      const data = {};
      const { statusCode, body, text } = await suite.as(alloweUser).post({ data });
      debug && logger.debug({ statusCode, body, text });
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('message');
      const expReg = create.requireProperties.map(prop => `(?=.*\\b${prop})\\b`).join('');
      expect(body.message).toMatch(new RegExp(expReg));
    });
  });
};

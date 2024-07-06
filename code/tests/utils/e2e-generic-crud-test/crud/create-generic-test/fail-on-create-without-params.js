module.exports = (entityName, suite, create) => {
  create.allowedUsers.forEach(async alloweUser => {
    test(`Should fail on create ${entityName} as ${alloweUser} without params`, async () => {
      const data = {};
      const { statusCode, body } = await suite.as(alloweUser).post({ data });
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('message');
      const expReg = create.requireProperties.map(prop => `(?=.*\\b${prop})\\b`).join('');
      expect(body.message).toMatch(new RegExp(expReg));
    });
  });
};

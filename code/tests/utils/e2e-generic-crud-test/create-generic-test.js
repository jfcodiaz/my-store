const { unauthorizedTest, unauthenticatedTest } = require("../../e2e/common");
const { GUEST } = require("../users");

const creteGenericTest = async ({
  suite,
  create,
  users,
  extractExpect = () => {},
  buildData,
  debug
} = {}) => {

  describe('[POST] /',  (statusCode, body, text, entity) => {
    //Unathorized and / or unautneticated
    users.filter( user => !create.allowedUsers.includes(user))
      .forEach(noAllowedUser => {
        if(noAllowedUser === GUEST){
          unauthenticatedTest({suite, method: 'post'});
          return;
        }
        unauthorizedTest({
          suite,
          title: `Fail to create as ${noAllowedUser}`,
          as: noAllowedUser,
          method: 'post',
          data: {}
        });
      });

    //Try to create entity without params as allowed users
    create.allowedUsers.forEach(async alloweUser => {
      test(`Create category as ${alloweUser}` , async () => {
        const data = {};
        const { statusCode, body, text} = await suite.as(alloweUser).post({ data });
        debug(statusCode, body, text);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body).toHaveProperty('message');
        const expReg = create.requireProperties.map(prop =>  `(?=.*\\b${prop})\\b`).join('');
        expect(body.message).toMatch(new RegExp(expReg));
      });
    });

    //Create entity as allowed users
    create.allowedUsers.forEach(async alloweUser => {
      test(`Create category as ${alloweUser}` , async () => {
        const data = await buildData();
        const { statusCode, body, text} = await suite.as(alloweUser).post({ data });
        debug(statusCode, body, text);
        expect(statusCode).toBe(201);
        const entiy = await create.loadEntity(body.id);
        extractExpect(statusCode, body, text, entity);
        create.checkToBeSameProperties.forEach(prop => {
          expect(entiy[prop]).toBe(body[prop]);
        });
      });
    });
  });
}

module.exports = creteGenericTest;

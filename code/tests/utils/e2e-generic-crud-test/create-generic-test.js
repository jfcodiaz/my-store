const { unauthorizedTest, unauthenticatedTest } = require("../../e2e/common");
const toBeArrayProp = require("../expects/to-be-array-prop");
const { GUEST } = require("../users");
const failOnCreateWithoutParamsTest = require("./create-generic-test/fail-on-create-without-params");

const creteGenericTest = async ({
  suite,
  entityName,
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
          title: `Fail to create ${entityName} as ${noAllowedUser}`,
          as: noAllowedUser,
          method: 'post',
          data: {}
        });
      });

    failOnCreateWithoutParamsTest(entityName, suite, create);

    //Create entity as allowed users
    create.allowedUsers.forEach(async alloweUser => {
      test(`Create ${entityName} as ${alloweUser} successfully` , async () => {
        const data = await buildData();
        const { statusCode, body, text} = await suite.as(alloweUser).post({ data });
        expect(statusCode).toBe(201);
        const entity = await create.loadEntity(body.id);
        extractExpect(statusCode, body, text, entity);
        toBeArrayProp(create.checkToBeSameProperties, entity, body)
      });
    });
  });
}

module.exports = creteGenericTest;

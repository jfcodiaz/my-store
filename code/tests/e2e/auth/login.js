const { decodeToken } = require("../../../services/jwt/decode-token");
const { ADMIN } = require("../../utils/users");

module.exports = (suite) => {
  const url = '/api/v1/auth/login';
  test('POST /login', async () => {
    await suite.loadUser(ADMIN);
    const user = suite.getUser(ADMIN);
    const { body, statusCode } = await suite.post(url, {
      data: {
        "email": user.email,
        "password": process.env.INITIAL_PASS
      }
    });

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.user.email).toEqual(user.email);
    expect(body.user.password).toBeUndefined();
    const decode = decodeToken(body.token);
    expect(decode.payload.sub).toEqual(user.id);
  });

  test('POST /login without data', async () => {
    const { statusCode, body, text } = await suite.post(url);

    failedExpects(400, 'Bad Request', statusCode, body, text);
  })

  test('POST /login with invalid user', async () => {
    const { statusCode, body, text } = await suite.post(url, {
      data: {
      "email": 'bad@userfake.com',
      "password": process.env.INITIAL_PASS
      }
    });

    failedExpects(401, /Unauthorized/, statusCode, body, text);
  });

  test('POST /login with valid password', async () => {
    const { statusCode, body, text } = await suite.post(url, {
      data : {
        "email": suite.getUser(ADMIN).email,
        "password": 'invalidPAssword'
      }
    });

    failedExpects(401, /Unauthorized/, statusCode, body, text);
  })

  const failedExpects = (expectCode, expectText, statusCode, body, text) => {
    expect(statusCode).toBe(expectCode);
    expect(body.token).toBeUndefined();
    expect(text).toMatch(expectText);
  }

}

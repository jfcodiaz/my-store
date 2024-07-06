const jwt = require('jsonwebtoken');

/**
 * @param {string} token - The JWT to decode.
 * @returns {object} - The decoded payload of the JWT.
 * @throws {Error} - If the token is not a valid JWT.
 */
function decodeToken (token) {
  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new Error('Invalid token.');
    }
    return decoded;
  } catch (error) {
    throw new Error('Error decoding token: ' + error.message);
  }
}

module.exports = { decodeToken };

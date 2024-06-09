const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (playload, donde) => {
  return donde(null, playload);
});

module.exports = JwtStrategy;

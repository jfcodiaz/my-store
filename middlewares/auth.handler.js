const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if(roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkRoles };

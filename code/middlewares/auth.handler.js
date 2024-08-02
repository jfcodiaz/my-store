const boom = require('@hapi/boom');
const passport = require('passport');

function checkRoles (...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}
const auth = passport.authenticate('jwt', { session: false });

module.exports = {
  checkRoles,
  onlyAdmin: [auth, checkRoles('admin')],
  onlyCustomer: [auth, checkRoles('customer')],
  auth
};

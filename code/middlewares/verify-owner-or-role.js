module.exports = ({ boom, userRepository }) => {
  const verifyOwnerOrRole = ({ repository, roles = [], verifyProperty, setEntityAs = 'entity' } = {}) => {
    return async (req, res, next) => {
      try {
        const entity = await repository.findOne(req.params.id);
        if (!entity) {
          return next(boom.notFound('Entity not found'));
        }

        const user = await userRepository.findOne(req.user.sub);

        if (roles.includes(user.role)) {
          return next();
        }
        const isOwner = await verifyProperty(entity, user);
        if (isOwner) {
          if (!req[setEntityAs]) {
            req[setEntityAs] = entity;
          }
          return next();
        } else {
          return next(boom.forbidden());
        }
      } catch (error) {
        return next(error);
      }
    };
  };
  return verifyOwnerOrRole;
};

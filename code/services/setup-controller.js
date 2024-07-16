const controllers = {};
let api;

const init = ({ asFunction, container, routers, capitalize, pluralize, express, makeInvoker }) => {
  Object.keys(routers).forEach(version => {
    controllers[version] = {};
  });
  return {
    makeInvoker: () => {
      api = makeInvoker((container) => {
        const ctrsTemp = {};
        Object.entries(controllers).forEach(([version, versionControllers]) => {
          Object.values(versionControllers).forEach(controller => {
            Object.values(controller).forEach(config => {
              const serviceName = config[0];
              ctrsTemp[serviceName] = (req, res, next) => container[serviceName](req, res, next);
            });
          });
        });
        return ctrsTemp;
      });
    },
    initRoutes: (app) => {
      Object.entries(routers).forEach(([version, config]) => {
        const [path, routerVersion] = config;
        Object.entries(controllers[version]).forEach(([entity, services]) => {
          const entityPath = `/${pluralize(entity)}`;
          const entityRouter = express.Router();
          Object.values(services).forEach(confg => {
            const [serviceName, method, servicePath, ...middlewares] = confg;
            middlewares.push(api(serviceName));
            entityRouter[method](servicePath, ...middlewares);
          });
          routerVersion.use(entityPath, entityRouter);
        });
        app.use(path, routerVersion);
      });
    },
    add: (name, apiVersion, services) => {
      controllers[apiVersion][name] = services;
      Object.entries(services).forEach(([service, config]) => {
        const [title] = config;
        const fn = config.pop();
        const serviceName = `${name}${capitalize(title, true)}${capitalize(apiVersion, true)}`;
        services[service][0] = serviceName;
        container.register({
          [serviceName]: asFunction(() => fn).singleton()
        });
      });
    }
  };
};

module.exports = {
  init
};

let api;
let _express;
let _pluralize;
const controllers = {};

const genericRoute = (service) => (req, res, next) => service(req, res, next);
const buildControllers = (container) => {
  const ctrsTemp = {};
  Object.entries(controllers).forEach(([version, versionControllers]) => {
    Object.values(versionControllers).forEach(controller => {
      Object.values(controller).forEach(config => {
        const serviceName = config[0];
        ctrsTemp[serviceName] = genericRoute(container[serviceName]);
      });
    });
  });
  return ctrsTemp;
};

const initRoutes = (app, routers) => {
  Object.entries(routers).forEach(([version, config]) => {
    const [path, routerVersion] = config;
    Object.entries(controllers[version]).forEach(([entity, services]) => {
      const entityPath = `/${_pluralize(entity)}`;
      const entityRouter = _express.Router();
      Object.values(services).forEach(confg => {
        const [serviceName, method, servicePath, ...middlewares] = confg;
        middlewares.push(api(serviceName));
        entityRouter[method](servicePath, ...middlewares);
      });
      routerVersion.use(entityPath, entityRouter);
    });
    app.use(path, routerVersion);
  });
};

const init = ({ asFunction, container, routers, capitalize, pluralize, express, makeInvoker }) => {
  _pluralize = pluralize;
  _express = express;

  Object.keys(routers).forEach(version => {
    controllers[version] = {};
  });

  return {
    makeInvoker: () => { api = makeInvoker(buildControllers); },
    initRoutes: (app) => initRoutes(app, routers),
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

/**
 * Basic http router with middleware support
 */

const url = require('url');

const Router = () => {
  const routes = [];
  const middleware = [];

  // register new route
  const createRoute = (method, path, handler) => {
    routes.push({ method, path, handler });
  };

  // expose http methods as functions
  const get = (path, handler) => createRoute('GET', path, handler);
  const post = (path, handler) => createRoute('POST', path, handler);
  const put = (path, handler) => createRoute('PUT', path, handler);
  const del = (path, handler) => createRoute('DELETE', path, handler);

  // find the appropriate route for the request
  const routesMiddleware = (ctx, next) => {
    const { request } = ctx;
    const { pathname } = url.parse(request.url);

    const route = routes.find(
      ({ method, path }) => method === request.method && path === pathname
    );

    if (route) {
      route.handler(ctx);
      return;
    }
    next();
  };

  // register new middleware
  const use = handler => middleware.push(handler);

  // start the middleware chain
  const run = ctx => {
    const dispatch = async i => {
      const currentMiddleware = middleware[i];
      if (currentMiddleware) {
        currentMiddleware(ctx, () => dispatch(i + 1));
      }
    };
    dispatch(0);
  };

  return {
    get,
    post,
    put,
    del,
    use,
    run,
    routesMiddleware,
  };
};

module.exports = Router;

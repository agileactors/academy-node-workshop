/**
 * Basic http router with middleware support
 */

const url = require('url');

const Router = () => {
  const routes = [];
  const middleware = [];

  // register new route
  const create = (method, path, handler) => {
    routes.push({ method, path, handler });
  };

  // find the appropriate route for the request
  const routesMiddleware = ctx => {
    const { request } = ctx;
    const { pathname } = url.parse(request.url);

    const route = routes.find(
      r => r.method === request.method && r.path === pathname
    );

    if (route) route.handler(ctx);
  };

  // register new middleware
  const use = handler => middleware.push(handler);

  // start the middleware chain
  const run = ctx => {
    // add routes as the last middleware
    middleware.push(routesMiddleware);

    const dispatch = async i => {
      const currentMiddleware = middleware[i];
      if (currentMiddleware) currentMiddleware(ctx, () => dispatch(i + 1));
    };

    dispatch(0);
  };

  return {
    use,
    create,
    run,
  };
};

module.exports = Router;

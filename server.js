/**
 * Node.js HTTP server
 */

const http = require('http');

const connect = require('./db/connect');
const logger = require('./libraries/logger'); // task: move logger to module
const Router = require('./libraries/router');

const PORT = process.env.PORT || 8080;

// initialize router
const router = Router();

// watcher middleware - TODO: move middleware to another folder
router.use(async (ctx, next) => {
  const { request } = ctx;

  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  logger.log(`${request.method} ${request.url} - ${duration}ms`);
});

// index route
router.get('/', ({ response }) => {
  response.setHeader('Content-Type', 'text/html');
  response.writeHead(200);
  response.end('<h1>Hello, Node!</h1>');
});

// add routes as middleware
router.use(router.routesMiddleware);

// 404 not-found middleware - TODO: move middleware to another folder
router.use(({ response }) => {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(404);
  response.end('Not Found');
});

// create HTTP server
const server = http.createServer((request, response) => {
  const ctx = { request, response };
  router.run(ctx);
});

// start the server
server.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);

  // connect to database
  connect()
    .then(message => logger.log(message))
    .catch(error => logger.log('DB_CONNECTION_ERROR', error.message));
});

process.on('unhandledRejection', error => {
  logger.log(error);
  process.exit(0);
});

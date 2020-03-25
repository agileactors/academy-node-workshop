/**
 * Node.js HTTP server
 */

const http = require('http');

const Router = require('./libraries/router');
const logger = require('./libraries/logger');
const staticMiddleware = require('./middleware/static');
const chatHandler = require('./handlers/chat');

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

// use static-file middleware
router.use(staticMiddleware);

// index route
router.get('/', ({ response }) => {
  response.setHeader('Content-Type', 'text/html');
  response.writeHead(200);
  response.end('<h1>Hello, Node.JS!</h1>');
});

// chat routes
router.get('/chat', chatHandler.get);
router.get('/chat/username', chatHandler.getUsername);
router.get('/chat/messages', chatHandler.getMessages);

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

module.exports = server;

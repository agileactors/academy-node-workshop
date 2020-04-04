/**
 * Node.js HTTP server
 */

const http = require('http');
const url = require('url');

const logger = require('./libraries/logger');
const chatHandler = require('./handlers/chat');

const server = http.createServer();

const PORT = process.env.PORT || 8001;

// server's handler function
server.on('request', (request, response) => {
  const { pathname } = url.parse(request.url);

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Index Page</h1>');
    response.end('<h1>About Page</h1>');
    return;
  }

  if (pathname === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>About Page</h1>');
    return;
  }

  // Uncomment for next task
  //
  // if (pathname === '/chat') {
  //   const ctx = { request, response };
  //   chatHandler.get(ctx);
  //   return;
  // }

  // if (pathname === '/chat/username') {
  //   const ctx = { request, response };
  //   chatHandler.getUsername(ctx);
  //   return;
  // }

  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.end('Not Found!');
});

// start server
server.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});

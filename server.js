/**
 * Node.js HTTP server
 */

const http = require('http');

const logger = require('./libraries/logger');
const chatHandler = require('./handlers/chat');

const server = http.createServer();

const PORT = process.env.PORT || 8001;

// server's handler function
server.on('request', (request, response) => {
  const { url } = request;

  switch (url) {
    case '/':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<h1>Index Page</h1>');
      break;
    case '/about':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<h1>About Page</h1>');
      break;
    //
    // Uncomment for next tasks
    //
    // case '/chat': {
    //   const ctx = { request, response };
    //   chatHandler.get(ctx);
    //   break;
    // }
    // case '/chat/username': {
    //   const ctx = { request, response };
    //   chatHandler.getUsername(ctx);
    //   break;
    // }
    default:
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found!');
  }
});

// start server
server.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});

process.on('uncaughtException', err => {
  logger.log(err);
  process.exit();
});

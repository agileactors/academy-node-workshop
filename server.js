/**
 * Node.js HTTP server
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('./libraries/logger');
const chatHandler = require('./handlers/chat');

const PORT = process.env.PORT || 8001;

// create a server instance
const server = http.createServer();

// get the views directory
const VIEWS_DIR = path.join(__dirname, 'views');

// request handlers
server.on('request', (request, response) => {
  const { url } = request;

  switch (url) {
    case '/':
      fs.readFile(path.join(VIEWS_DIR, 'home.html'), 'utf8', (err, data) => {
        if (err) {
          response.writeHead(404, {
            'Content-Type': 'text/plain',
          });

          return response.end('Whoops! File not found.');
        }

        response.writeHead(200, {
          'Content-Type': 'text/html',
        });
        response.end(data);
      });
      break;
    case '/chat':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<h2>Chat Page</h2>');
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

// Do not edit
process.on('uncaughtException', err => {
  logger.log(`pid ${process.pid}: ${err.message}`);
  process.exit(0);
});

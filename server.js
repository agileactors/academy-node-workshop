/**
 * Node.js HTTP server
 */
const http = require('http');
const logger = require('./libraries/logger');

/**
 * Task 1: create a simple http server
 *
 * Use the http module to create an http server
 *
 * Hint: use the PORT env variable as the server's listening port
 

 * Task 2: Create a simple http router
 *
 * Using the request.url property create the following endpoints:
 *
 *  1. '/' => serves views/home.html
 *  2. '/chat' => serves views/chat.html
 *  3. if the requested route not found return a http 404 with message 'Not found'
 * 
 * Hint: use utf8 encoding.
 * Hint: The response should be in html or text format so you need to
 * set the appropriate headers before sending the response.
 *
 
 *
 * Task 3: start the server
 *
 */

// Do not edit
process.on('uncaughtException', err => {
  logger.log(`pid ${process.pid}: ${err.message}`);
  process.exit(0);
});

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
 *  1. '/home' => <h1>Home Page</h1>
 *  2. '/about' => <h1>About Page</h1>
 *
 * Hint: The response should be in html format so you need to
 * set the appropriate headers before sending the response.
 *
 
 * Task 3: start the server
 *
 * start the server
 */

// Do not edit
process.on('uncaughtException', err => {
  logger.log(err);
  process.exit();
});

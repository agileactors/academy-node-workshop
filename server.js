/**
 * Node.js HTTP server
 */
const http = require('http');

/**
 * Task 1: create a simple http server
 *
 * Use the http module to create an http server that
 * responds with the text "Hello World!".
 *
 * Hint: use the PORT env variable as the server's listening port
 *
 * Task 2: Create a simple http router
 *
 * Using the url module, get the 'pathname' from the request URL
 * and create the following endpoints:
 *
 *  1. '/' => <h1>Index Page</h1>
 *  2. '/about' => <h1>About Page</h1>
 *
 * Hint: The response here is in html format so you need to
 * set the appropriate headers before sending the response.
 *
 * Task 3: Catch unhandled errors
 *
 * Use the global process object and catch the 'uncaughtException' and
 * 'unhandledRejection' errors, use the logger to log them to the console
 * and exit the process.
 *
 */

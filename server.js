/**
 * Node.js HTTP server
 */
const http = require('http');

/**
 * Task 1: Create a simple http server that responds with the text "Hello World!"
 *
 * Use the http module to create an http server
 * Hint: use the PORT env variable as the server's listening port (if PORT is not defined, default to 8001)
 *
 * Task 2: Create a simple http router
 *
 * Using the request.url property create the following endpoints:
 * Hint: use the JavaScript's `URL` global object to extract the pathname from the url
 *       [https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname]
 *
 *  1. '/' => <h1>Index Page</h1>
 *  2. '/about' => <h1>About page</h1>
 *  3. If the requested route not found return a http 404 with message 'Not found'
 *
 * Hint: The response should be in html or text format so you need to
 * set the appropriate headers before sending the response.
 *
 * Task 3: Catch unhandled errors
 *
 * Use the global process object and catch the 'uncaughtException' and
 * 'unhandledRejection' errors, use the logger to log them to the console
 * and exit the process.
 *
 */

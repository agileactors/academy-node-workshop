/**
 * Node.js HTTP server
 */

const http = require("http");

/**
 * Request handler
 * @param {*} req
 * @param {*} res
 */
const requestListener = (req, res) => {
  res.writeHead(200);
  res.end("Hello, Node!");
};

// create HTTP server
const server = http.createServer(requestListener);

// start the server
server.listen(8080);

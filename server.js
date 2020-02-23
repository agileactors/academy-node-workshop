/**
 * Node.js HTTP server
 */

const http = require("http");
const logger = require("./libraries/logger"); // task: move logger to module
const PORT = process.argv[2] || 8080; // task: use process to get arguments from cli

/**
 * Request handler
 * @param {*} req
 * @param {*} res
 */
const requestListener = (req, res) => {
  // task: implement the handler
  res.writeHead(200);
  res.end("Hello, Node!");
};

// create HTTP server
const server = http.createServer(requestListener);

// start the server
server.listen(PORT, () => {
  logger.log("SUCCESS", `Server listening on port ${PORT}`);
});

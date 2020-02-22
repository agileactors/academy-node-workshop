/**
 * Node.js HTTP server
 */

const http = require("http");

const PORT = 8080;

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
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// promisify readFile utility
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

// get root directory
const rootDir = process.cwd();

// get static-files folder
const staticDir = path.join(rootDir, 'static');

const middleware = async ({ request, response }, next) => {
  try {
    const staticPath = path.join(staticDir, request.url);

    const stats = await stat(staticPath);

    // if path is not file continue the chain
    if (!stats.isFile()) {
      next();
    }

    // read file's content
    const content = await readFile(staticPath);

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(content);
  } catch (err) {
    next();
  }
};

module.exports = middleware;

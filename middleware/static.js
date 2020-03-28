/**
 * Static file middleware
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const logger = require('../libraries/logger');
const { MIMETYPES } = require('../constants');

// promisify readFile utility
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

// get root directory
const rootDir = process.cwd();

// get static-files folder
const staticDir = path.join(rootDir, 'static');

const middleware = async ({ request, response }, next) => {
  try {
    const { url: filePath } = request;
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIMETYPES[extname] || 'application/octet-stream';
    const staticPath = path.join(staticDir, request.url);
    const stats = await stat(staticPath);

    // if path is not a file continue the chain
    if (!stats.isFile()) {
      next();

      return;
    }

    // read file's content
    const content = await readFile(staticPath);

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  } catch (err) {
    logger.log(err);
    next();
  }
};

module.exports = middleware;

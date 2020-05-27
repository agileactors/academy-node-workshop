const { stat, readFile } = require('fs').promises;
const path = require('path');

const logger = require('../libraries/logger');
const { MIMETYPES } = require('../constants');

// get root directory
const rootDir = process.cwd();

// get static-files folder
const staticDir = path.join(rootDir, 'static');

const middleware = async ({ request, response }, next) => {
  try {
    const { url: filepath } = request;

    const staticPath = path.join(staticDir, filepath);
    const stats = await stat(staticPath);

    // if path is not file (e.g a route /home) continue the chain
    if (!stats.isFile()) {
      next();
      return;
    }

    const extname = String(path.extname(filepath)).toLowerCase();
    const contentType = MIMETYPES[extname] || 'application/octet-stream';

    // read file's content
    const content = await readFile(staticPath);

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  } catch (err) {
    logger.logToConsole = false;
    logger.log(err);
    next();
  }
};

module.exports = middleware;

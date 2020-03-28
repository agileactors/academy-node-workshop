/**
 * Static file middleware
 */

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
  let filePath = `.${request.url}`;
  console.log(filePath);
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  try {
    const staticPath = path.join(staticDir, request.url);
    const stats = await stat(staticPath);

    // if path is not file continue the chain
    if (!stats.isFile()) {
      next();
      return;
    }

    // read file's content
    const content = await readFile(staticPath);

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  } catch (err) {
    next();
  }
};

module.exports = middleware;

const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const logger = require('../libraries/logger');

const rootDir = process.cwd();

const get = ({ response }) => {
  const html$ = fs.createReadStream(path.join(rootDir, 'views', 'chat.html'));
  html$.pipe(response);
  html$.on('error', err => logger.log(err));
};

const getUsername = async ({ response }) => {
  try {
    const randomUsername = shortid.generate();
    const data = await JSON.stringify({
      username: randomUsername,
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(data);
  } catch (err) {
    logger.log(err);
  }
};

module.exports = { get, getUsername };

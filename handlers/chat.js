const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const logger = require('../libraries/logger');

const rootDir = process.cwd();

const get = ({ response }) => {
  const stream = fs.createReadStream(path.join(rootDir, 'views', 'chat.html'));
  stream.pipe(response);
  stream.on('error', err => {
    logger.log(err);
  });
};

const getUsername = async ({ response }) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    await JSON.stringify({
      username: `user_${shortid.generate()}`,
    })
  );
};

module.exports = { get, getUsername };

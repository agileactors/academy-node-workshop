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
  const randomUsername = await shortid.generate();
  const data = JSON.stringify({
    username: randomUsername,
  });

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(data);
};

module.exports = { get, getUsername };

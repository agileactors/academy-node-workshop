const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const logger = require('../libraries/logger');
const { Model: MessageModel } = require('../models/message');

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

const getMessages = async ({ response }) => {
  try {
    const data = await MessageModel.find({}).exec();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(await JSON.stringify(data));
  } catch (err) {
    logger.log(err);
  }
};

module.exports = { get, getUsername, getMessages };

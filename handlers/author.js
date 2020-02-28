const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');
const templates = require('../templates');

const get = async ({ response }) => {
  try {
    const data = await AuthorModel.getAll();
    const html = templates.authorList(data);

    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(`<section>${html}</section>`);
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  get,
};

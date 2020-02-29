const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');
const templates = require('../templates');

const getAuthors = async ({ response }) => {
  try {
    const data = await AuthorModel.find({});

    // use template to build the html
    const html = templates.authors(data);

    // send response
    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(`<section style='width: 600px;'>${html}</section>`);
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  getAuthors,
};

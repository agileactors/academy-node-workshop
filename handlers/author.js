const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');
const getTemplate = require('../libraries/getTemplate');

const get = async ({ response }) => {
  try {
    const authors = await AuthorModel.getAll();
    const html = await getTemplate('authors:list', {
      authors,
      generatedAt: new Date(),
    });

    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(html);
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  get,
};

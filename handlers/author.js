const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');
const templateEngine = require('../libraries/html');

const getAuthors = async ({ response }) => {
  try {
    const authors = await AuthorModel.find({});

    const data = {
      title: 'The Authors List',
      authors,
    };

    const html = templateEngine.render('authors', data);

    // send response
    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(html);
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  getAuthors,
};

const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');

const get = async ({ response }) => {
  try {
    const authors = await AuthorModel.getAll();
    const html = authors.reduce((htmlText, author) => {
      const { name, surname } = author;
      let text = htmlText;
      text += `<div>${surname} ${name}</div>`;

      return text;
    }, '');

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

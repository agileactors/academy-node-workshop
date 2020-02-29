const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');
const getTemplate = require('../libraries/getTemplate');

const get = async ({ response }) => {
  const buildHtml = data => {
    const isArray = Array.isArray(data);
    const html = isArray
      ? data.reduce((htmlText, author) => {
          const { name, surname } = author;

          let text = htmlText;

          text += `<div>${name} ${surname}</div>`;

          return text;
        }, '')
      : data;

    return html;
  };

  try {
    const authors = await AuthorModel.getAll();
    const html = await getTemplate(
      'authors:list',
      {
        authors,
        generatedAt: new Date(),
      },
      buildHtml
    );

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

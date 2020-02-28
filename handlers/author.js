const { Model: AuthorModel } = require('../models/author');
const logger = require('../libraries/logger');

const get = async ({ response }) => {
  try {
    AuthorModel.find({}, (err, authors) => {
      const html = authors.reduce((htmlText, author) => {
        const { name, surname } = author;
        let text = htmlText;
        text += `<div>${surname} ${name}</div>`;

        return text;
      }, '');

      // or you can executing a query explicitly
      // const query = AuthorModel.find({}, null, { skip: 10 });
      // query.exec((err, authors) => console.log(authors));

      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(`<section>${html}</section>`);
    });
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  get,
};

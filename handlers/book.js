const { Model: BookModel } = require('../models/book');
const logger = require('../libraries/logger');

const get = async ({ response }) => {
  try {
    BookModel.find({}, null, (_, books) => {
      const html = books.reduce((htmlText, book) => {
        const { title, subtitle, description, authors, isbn } = book;

        let text = htmlText;

        text += `
          <br>
            <div><b>${title}</b></div>
            <div><b>${subtitle}</b></div>
            <p>${description}</p>
            <ul>
              ${authors.map(
                ({ name, surname }) => `<li>${name} ${surname}</li>`
              )}
            </ul>
            <div>${isbn}</div>
          <br><br>
        `;

        return text;
      }, '');

      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(`<section style='width: 600px;'>${html}</section>`);
    });
  } catch (err) {
    logger.log(err);
  }
};

module.exports = {
  get,
};

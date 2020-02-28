const { Model: BookModel } = require('../models/book');
const logger = require('../libraries/logger');
const templates = require('../templates');

const getBookList = async ({ response }) => {
  try {
    BookModel.find({}, (err, data) => {
      // use template to build the html
      const html = templates.bookList(data);
      // send response
      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(`<section style='width: 600px;'>${html}</section>`);
    });
  } catch (err) {
    logger.log(err);
  }
};

const getByISBN = async ({ request, response }) => {
  try {
    const { isbn } = request.query;

    BookModel.findOne({ isbn }, (err, data) => {
      // if book not in database respond with 404
      if (!data) {
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      const html = templates.book(data);

      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(`<section style='width: 600px;'>${html}</section>`);
    });
  } catch (err) {
    logger.log(err);
  }
};

const get = async ctx => {
  const parsedUrl = new URL(ctx.request.url, 'http://example.com');
  const isbn = parsedUrl.searchParams.get('isbn');

  if (isbn) {
    ctx.request.query = { isbn };
    getByISBN(ctx);
    return;
  }

  getBookList(ctx);
};

module.exports = {
  get,
};

const { parse } = require('querystring');

const logger = require('../libraries/logger');
const templates = require('../templates');
const { Model: BookModel } = require('../models/book');
const { Model: AuthorModel } = require('../models/author');

const getBookList = async ({ response }) => {
  try {
    const data = await BookModel.find({})
      .populate('author')
      .exec();
    // use template to build the html
    const html = templates.bookList(data);
    // send response
    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(`<section style='width: 600px;'>${html}</section>`);
  } catch (err) {
    logger.log(err);
  }
};

const getByISBN = async ({ request, response }) => {
  try {
    const { isbn } = request.query;

    const data = await BookModel.findOne({ isbn })
      .populate('author')
      .exec();
    // if book not in database respond with 404
    if (!data) {
      response.setHeader('Content-Type', 'text/html');
      response.writeHead(404);
      response.end('Not Found');
      return;
    }

    // use template to build the html
    const html = templates.book(data);

    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(`<section style='width: 600px;'>${html}</section>`);
  } catch (err) {
    logger.log(err);
  }
};

const get = ctx => {
  const parsedUrl = new URL(ctx.request.url, 'http://example.com');
  const isbn = parsedUrl.searchParams.get('isbn');

  if (isbn) {
    ctx.request.query = { isbn };
    getByISBN(ctx);
    return;
  }

  getBookList(ctx);
};

const getCreateForm = async ({ response }) => {
  try {
    const data = await AuthorModel.find({}).exec();

    const html = templates.bookForm(data);

    response.setHeader('Content-Type', 'text/html');
    response.writeHead(200);
    response.end(`<section>${html}</section>`);
  } catch (err) {
    logger.log(err);
  }
};

const post = ({ request, response }) => {
  try {
    const buffer = [];

    request.on('data', chunk => buffer.push(chunk.toString()));
    request.on('end', async () => {
      // transform buffer to json object
      const body = parse(buffer.join());
      // get data from body
      const { title, subtitle, description, author, isbn } = body;

      const newBook = await BookModel.create({
        title,
        subtitle,
        description,
        author,
        isbn,
      });

      const html = templates.book(
        await newBook.populate('author').execPopulate()
      );

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
  getCreateForm,
  post,
};

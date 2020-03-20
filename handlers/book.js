const { parse } = require('querystring');

const logger = require('../libraries/logger');
const templateEngine = require('../libraries/html');
const { Model: BookModel } = require('../models/book');
const { Model: AuthorModel } = require('../models/author');

const getBookList = async ({ response }) => {
  try {
    const data = await BookModel.find({})
      .populate('author')
      .exec();

    // use template to build the html
    const html = templateEngine.render('books', {
      title: 'The Book List',
      books: data,
    });

    // send response
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
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
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('Not Found');
      return;
    }

    // use template to build the html
    const html = templateEngine.render('book', data);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  } catch (err) {
    logger.log(err);
  }
};

const getBooks = ctx => {
  const parsedUrl = new URL(ctx.request.url, 'http://example.com');
  const isbn = parsedUrl.searchParams.get('isbn');

  if (isbn) {
    ctx.request.query = { isbn };
    getByISBN(ctx);
    return;
  }

  getBookList(ctx);
};

const getBookForm = async ({ response }) => {
  try {
    const data = await AuthorModel.find({}).exec();

    const html = templateEngine.render('create', {
      authors: data,
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  } catch (err) {
    logger.log(err);
  }
};

const createBook = ({ request, response }) => {
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

      const html = templateEngine.render(
        'book',
        await newBook.populate('author').execPopulate()
      );

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(html);
    });
  } catch (err) {
    logger.log(err);
  }
};

const deleteByISBN = async ({ request, response }) => {
  try {
    const { isbn } = request.query;

    await BookModel.deleteOne({ isbn }).exec();

    const html = templateEngine.render('delete');

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  } catch (err) {
    logger.log(err);
  }
};

const deleteBook = ctx => {
  const parsedUrl = new URL(ctx.request.url, 'http://example.com');
  const isbn = parsedUrl.searchParams.get('isbn');

  if (isbn) {
    ctx.request.query = { isbn };
    deleteByISBN(ctx);
    return;
  }

  ctx.response.writeHead(400, { 'Content-Type': 'text/html' });
  ctx.response.end('ISBN required to delete a book');
};

module.exports = {
  getBooks,
  getBookForm,
  createBook,
  deleteBook,
};

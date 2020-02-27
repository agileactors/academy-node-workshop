const mongoose = require('mongoose');
const { Schema: AuthorSchema } = require('./author');

const { Schema } = mongoose;
const { String } = Schema.Types;

const BookSchema = Schema({
  title: {
    type: String,
    required: [true, 'book `title` is required'],
  },
  subtitle: String,
  description: {
    type: String,
    required: [true, 'book `description` is required'],
  },
  authors: [AuthorSchema],
  isbn: {
    type: String,
    required: [true, 'book `isbn` is required'],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = {
  Model: BookModel,
  Schema: BookSchema,
};

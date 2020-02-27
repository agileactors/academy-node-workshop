const mongoose = require('mongoose');

const { Schema } = mongoose;
const { String } = Schema.Types;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'author `name` is required'],
  },
  surname: {
    type: String,
    required: [true, 'author `surname` is required'],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const AuthorModel = mongoose.model('Author', AuthorSchema);

/**
 * Get all authors
 */
AuthorSchema.statics.findAllAuthors = async () => {
  const authors = await AuthorModel.find({});

  return authors;
};

module.exports = {
  Model: AuthorModel,
  Schema: AuthorSchema,
};

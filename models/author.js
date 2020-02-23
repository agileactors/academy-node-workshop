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
});

const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = {
  Model: AuthorModel,
  Schema: AuthorSchema,
};
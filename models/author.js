const mongoose = require('mongoose');
const logger = require('../libraries/logger');

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

// eslint-disable-next-line
AuthorSchema.statics.getAll = () => AuthorModel.find({});

const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = {
  Model: AuthorModel,
  Schema: AuthorSchema,
};

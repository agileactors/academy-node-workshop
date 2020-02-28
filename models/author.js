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

// eslint-disable-next-line
AuthorSchema.statics.getAll = () => {
  const query = AuthorModel.find({}, null, { skip: 0 });

  return query.exec();
};

const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = {
  Model: AuthorModel,
  Schema: AuthorSchema,
};

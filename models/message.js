const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = Schema({
  text: {
    type: Schema.Types.String,
    required: [true, 'chat `text` is required'],
  },
  username: {
    type: String,
    required: [true, 'chat `username` is required'],
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = {
  Model: MessageModel,
  Schema: MessageSchema,
};

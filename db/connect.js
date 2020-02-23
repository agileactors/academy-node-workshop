const mongoose = require('mongoose');
const config = require('../config');

const { URI } = config || process.env;

// local imports
const logger = require('../libraries/logger');

// setup mongoose Promise usage
mongoose.Promise = global.Promise;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

function onOpen() {
  logger.log('Database connected successfully.');
}

function onError(err) {
  logger.log('Database connection failed.', err);
}

db.on('open', onOpen);
db.on('error', onError);

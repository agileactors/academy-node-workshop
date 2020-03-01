/**
 * Database connection file
 */

const mongoose = require('mongoose');
const config = require('../config');

const { URI } = config;

// setup mongoose
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const connect = () => {
  const db = mongoose.connection;

  const resultP = new Promise((resolve, reject) => {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    db.on('error', error => reject(error));

    db.once('open', () => {
      resolve('Database connection: OK');
    });
  });

  return resultP;
};

module.exports = connect;

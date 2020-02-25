/**
 * Applications configuration file
 */

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-diifo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const config = {
  URI,
};

module.exports = config;

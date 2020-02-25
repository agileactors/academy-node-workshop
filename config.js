/**
 * Applications configuration file
 */

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority`;

const config = {
  URI,
};

module.exports = config;

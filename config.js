/**
 * Applications configuration file
 */

// todo: use .env
const DB_USER = '';
const DB_PASSWORD = '';
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-diifo.mongodb.net/db_z0?retryWrites=true&w=majority`;

const config = {
  URI,
};

module.exports = config;

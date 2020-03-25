/**
 * Applications configuration file
 */

const { DB_LOCAL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const protocol = DB_LOCAL === 'true' ? 'mongodb' : 'mongodb+srv';

const URI = `${protocol}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority`;

console.log(URI);

const config = {
  URI,
};

module.exports = config;

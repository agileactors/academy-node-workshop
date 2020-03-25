const server = require('./server');
const sockets = require('./sockets');
const connect = require('./db/connect');
const logger = require('./libraries/logger');

// PORT env variable
const PORT = process.env.PORT || 8080;

// hook socket.io to server
sockets.init(server);

// start the server
server.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
  // connect to database
  connect()
    .then(message => logger.log(message))
    .catch(error => logger.log('DB_CONNECTION_ERROR', error.message));
});

process.on('uncaughtException', error => {
  logger.log(error);
  process.exit(0);
});

process.on('unhandledRejection', error => {
  logger.log(error);
  process.exit(0);
});

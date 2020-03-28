const server = require('./server');
const logger = require('./libraries/logger');

// PORT env variable
const PORT = process.env.PORT || 8001;

// start the server
server.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});

process.on('uncaughtException', error => {
  logger.log(error);
  process.exit(0);
});

process.on('unhandledRejection', error => {
  logger.log(error);
  process.exit(0);
});

const path = require('path');
const socketIO = require('socket.io');
const { Worker } = require('worker_threads');

const logger = require('./libraries/logger');
const { Model: MessageModel } = require('./models/message');

const runWorker = (p, cb, data) => {
  const worker = new Worker(p, { workerData: data });
  worker.on('message', result => cb(null, result));
  worker.on('error', cb);
  worker.on('exit', code => {
    if (code !== 0) {
      cb(new Error(`Worker has stopped with code ${code}`));
    }
  });
};

const init = async server => {
  // server start time
  const startTime = Math.round(new Date().getTime() / 1000);

  // initialize socket.io
  const io = socketIO(server);

  // initialize analytics object
  const analytics = {
    connected: 0,
    totalMessages: 0,
    perMinute: 0,
  };

  // update totalMessages
  analytics.totalMessages = await MessageModel.countDocuments({}).exec();

  // run heavy task on different thread
  runWorker(
    path.join(__dirname, '/utilities/messagesPerMinute.js'),
    (err, result) => {
      if (err) {
        logger.log(err);
        return;
      }
      // update analytics
      analytics.perMinute = result.toFixed(2);
      // send new analytics to connected users
      io.emit('server:analytics', analytics);
    },
    {
      startTime,
    }
  );

  io.on('connection', socket => {
    // update connected clients
    analytics.connected += 1;

    // send updated analytics to everyone
    io.emit('server:analytics', analytics);

    // when a socket disconnects update analytics
    socket.on('disconnect', () => {
      analytics.connected -= 1;
      io.emit('server:analytics', analytics);
    });

    socket.on('client:message', async data => {
      // create and save new message to database
      const message = await MessageModel.create({
        text: data.text,
        username: data.username,
      });

      // broadcast new message to everyone
      io.emit('server:message', message);

      // update analytics
      analytics.totalMessages += 1;
      io.emit('server:analytics', analytics);
    });
  });
};

module.exports = {
  init,
};

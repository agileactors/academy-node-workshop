const socketIO = require('socket.io');
const path = require('path');
const { fork } = require('child_process');
const logger = require('./libraries/logger');
const MessageModel = require('./models/Message');

const messagesPerMinutePath = path.join(
  __dirname,
  '/scripts/messagesPerMinute.js'
);

const runChildProcess = (module, cb, options = []) => {
  const child = fork(module, options);

  child.on('message', result => cb(null, result));
  child.on('error', cb);
  child.on('exit', code => {
    if (code !== 0) {
      cb(new Error(`Process has stopped with code ${code}`));
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

  const callback = (err, result) => {
    if (err) {
      logger.log(err);
      return;
    }

    // update analytics
    analytics.perMinute = result.toFixed(2);

    // send new analytics to connected users
    io.emit('server:analytics', analytics);
  };

  // run heavy task on different process
  runChildProcess(messagesPerMinutePath, callback, [startTime]);

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
      const newMessage = await MessageModel.create({
        text: data.text,
        username: data.username,
      });

      // broadcast new message to everyone
      io.emit('server:message', newMessage);

      // update analytics
      analytics.totalMessages += 1;
      io.emit('server:analytics', analytics);
    });
  });
};

module.exports = {
  init,
};

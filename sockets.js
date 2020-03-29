const { fork } = require('child_process');
const socketIO = require('socket.io');
const { Model: MessageModel } = require('./models/message');

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

  // is a child process already running
  let childProcessRunning = false;

  // calculate messages-per-minute in regular interval
  setInterval(async () => {
    if (!childProcessRunning) {
      // start heavy computation on child process
      const child = fork('./utilities/messagesPerMinute.js');
      childProcessRunning = true;

      const totalMessages = await MessageModel.countDocuments({}).exec();

      const messages = await MessageModel.find({
        timestamp: { $gte: startTime },
      })
        .sort({ timestamp: 1 })
        .exec();

      // send data to child process
      child.send(messages);

      child.on('message', async messagesPerMinute => {
        // update analytics
        analytics.totalMessages = totalMessages;
        analytics.perMinute = messagesPerMinute.toFixed(2);

        // shutdown child process
        child.kill();
        childProcessRunning = false;

        // send new analytics to connected users
        io.emit('server:analytics', analytics);
      });
    }
  }, 5000);

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

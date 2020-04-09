const socketIO = require('socket.io');
const { Model: MessageModel } = require('./models/message');
const { messagesPerMinute } = require('./utilities');

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

  // get total messages when server starts
  const totalMessages = await MessageModel.countDocuments({}).exec();
  analytics.totalMessages = totalMessages;

  // calculate messages-per-minute in regular interval
  setInterval(async () => {
    // get all messages from the server's start time to now
    const messages = await MessageModel.find({ timestamp: { $gte: startTime } })
      .sort({ timestamp: 1 })
      .exec();

    analytics.perMinute = messagesPerMinute(messages).toFixed(2);
    io.emit('server:analytics', analytics);
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

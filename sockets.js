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
    messages: await MessageModel.countDocuments({}).exec(),
    mpm: 0, // messages per minute
  };

  // calculate messages-per-minute in regular interval
  setInterval(async () => {
    const messages = await MessageModel.find({ timestamp: { $gte: startTime } })
      .sort({ timestamp: 1 })
      .exec();
    analytics.mpm = messagesPerMinute(messages);
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
      analytics.messages += 1;

      io.emit('server:analytics', analytics);
    });
  });
};

module.exports = {
  init,
};

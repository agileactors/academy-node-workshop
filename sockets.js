const socketIO = require('socket.io');
const { Model: MessageModel } = require('./models/message');

const init = async server => {
  // initialize socket.io
  const io = socketIO(server);

  io.on('connection', socket => {
    socket.on('client:message', async data => {
      // create and save new message to database
      const message = await MessageModel.create({
        text: data.text,
        username: data.username,
      });

      // broadcast new message to everyone
      io.emit('server:message', message);
    });
  });
};

module.exports = {
  init,
};

const socketIO = require('socket.io');
const { Model: MessageModel } = require('./models/message');

const init = async server => {
  // initialize socket.io
  const io = socketIO(server);

  /**
   * Task 1: Use socket.io to receive/send realtime messages
   *
   * Use the socket.io library to listen for any new messages
   * coming throw web-sockets. If it does, create a new message
   * from the data received (see Hint 1) and then broadcast
   * the new message to all connected clients (see Hint 2).
   *
   * Hint 1: Use the following code to create new message.
   *
   *  const message = await MessageModel.create({
   *    text: data.text,
   *    username: data.username,
   *  });
   *
   *  Hint 2: Use the io.emit() method to broadcast a message
   *  to all connected clients.
   */

  io.on('connection', socket => {
    // implementation
  });
};

module.exports = {
  init,
};

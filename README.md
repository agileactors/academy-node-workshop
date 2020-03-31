# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will learn about web-sockets

In applications like a chat app realtime communication between the client and the server is a must have. This kind of communications can be achieved by a technology called **Web Sockets** (https://en.wikipedia.org/wiki/WebSocket). In node.js we can easily work with web-sockets using a popular library called socket.io

- https://socket.io

Usage:

```js
const io = require('socket.io')();

// a client connected
io.on('connection', socket => {
  // send the client a message
  socket.emit('server:message', {
    greeting: 'Hello there!',
  });

  // receive a message from client
  socket.on('client:message', data => {
    console.log(data);
  });
});
```

## Branch Tasks

1. Use socket.io to receive/send realtime messages

## Covers

- Web Sockets (socket.io)

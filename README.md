# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will learn about Node.js streams and the JSON global object.

Usage:

```js
const fs = require('fs');

const readStream = fs.createReadStream('some-file');
const writeStream = fs.createWriteStream('some-file-copy');

readStream.on('data', (chunk) => {
  writeStream.write(chunk);
});

```

Docs:
- https://nodejs.org/api/stream.html
- https://nodejs.org/en/knowledge/javascript-conventions/what-is-json/

## Branch Tasks

1. Create a handler that responds with html (using streams)
2. Create a handler that responds with JSON

Open the handlers folder and go to **chat.js** file to start writing your code. You should also update
the **server.js** file after you create the chat handler.
To start the application and test your code issue the following command in a terminal:

```
npm run setup
```

## Covers

- Streams
- JSON

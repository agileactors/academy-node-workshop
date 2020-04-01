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

## Covers

- Streams
- JSON

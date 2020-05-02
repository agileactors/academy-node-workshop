const stream = require('stream');

class Tap extends stream.Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    console.log(chunk.toString());

    this.push(chunk);
    callback();
  }
}

module.exports = Tap;

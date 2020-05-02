const stream = require('stream');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const logger = require('../libraries/logger');
const Tap = require('../libraries/tap');

const { pipeline } = stream;
const cwd = process.cwd();
const logFile = path.join(cwd, 'logs/debug.log');

class TransformLog extends stream.Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();

    this.push(data.toUpperCase());
    callback();
  }
}

const tap = new Tap();
const transformLog = new TransformLog();

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.

// synchronous
pipeline(
  fs.createReadStream(logFile),
  transformLog,
  tap,
  zlib.createGzip(),
  fs.createWriteStream(path.join(cwd, 'logs/debug.gz')),
  err => {
    if (err) {
      logger.log('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);

// asynchronous
// const util = require('util');
// const pipeline = util.promisify(stream.pipeline);

// async function run() {
//   try {
//     await pipeline(
//      fs.createReadStream(logFile),
//      zlib.createGzip(),
//      fs.createWriteStream(path.join(cwd, 'logs/debug.gz')),
//     );
//     console.log('Pipeline succeeded');
//   } catch (err) {
//     logger.log('Pipeline failed', err);
//   }
// }

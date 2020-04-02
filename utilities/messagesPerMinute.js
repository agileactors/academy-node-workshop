const { parentPort, workerData } = require('worker_threads');

const connect = require('../db/connect');
const { Model: MessageModel } = require('../models/message');

// block the event loop for x msec
function delay(msec) {
  const start = new Date();
  while (new Date() - start < msec) {
    // ahhh doing nothing...
  }
}

// connect to database
connect().catch(() => process.exit(1));

const { startTime } = workerData;

setInterval(async () => {
  const messages = await MessageModel.find({
    timestamp: { $gte: startTime },
  })
    .sort({ timestamp: 1 })
    .exec();

  // simulate long running task
  delay(5000);

  if (messages.length === 0) {
    parentPort.postMessage(0);
    return;
  }
  // get current time
  const now = Math.round(new Date().getTime() / 1000);
  // number of seconds from now to last message
  const diff = Math.floor((now - messages[0].timestamp) / 60) + 1;
  // create frequency table
  const frequency = new Array(diff).fill(0);

  messages.forEach(({ timestamp }) => {
    const key = Math.floor(now / timestamp) - 1;
    frequency[key] += 1;
  });

  const sum = frequency.reduce((acc, value) => acc + value, 0);
  const total = frequency.length;

  parentPort.postMessage(sum / total);
}, 5000);

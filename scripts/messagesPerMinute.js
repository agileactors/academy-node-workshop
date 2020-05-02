const connect = require('../db/connect');
const MessageModel = require('../models/Message');

// block the event loop for x msec
function delay(msec) {
  const start = new Date();

  while (new Date() - start < msec) {
    // ahhh doing nothing...
  }
}

// connect to database
connect().catch(() => process.exit(1));

// get server's start time from args
const startTime = parseInt(process.argv[2], 10);

setInterval(async () => {
  const messages = await MessageModel.find({
    timestamp: { $gte: startTime },
  })
    .sort({ timestamp: 1 })
    .exec();

  // simulate long running task
  // delay(5000);

  if (messages.length === 0) {
    process.send(0);
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

  process.send(sum / total);
}, 5000);

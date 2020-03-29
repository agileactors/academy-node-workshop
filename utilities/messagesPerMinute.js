const { parentPort } = require('worker_threads');

// block the event loop for x msec
function delay(msec) {
  const start = new Date();
  while (new Date() - start < msec) {
    // ahhh doing nothing...
  }
}

parentPort.on('message', async data => {
  // parse json to create messages array
  const messages = await JSON.parse(data);

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
});

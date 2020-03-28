module.exports = messages => {
  if (messages.length === 0) {
    return 0;
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

  return sum / total;
};

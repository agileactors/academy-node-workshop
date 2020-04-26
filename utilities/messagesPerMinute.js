/**
 * Calculate the avarage message per minute
 * @param {*} messages
 */

const perMinute = messages => {
  if (messages.length === 0) {
    return 0;
  }

  const now = Math.round(new Date().getTime() / 1000); // get current time
  const diff = Math.floor((now - messages[0].timestamp) / 60) + 1; // number of seconds from now to last message
  const frequency = new Array(diff).fill(0); // create frequency table

  messages.forEach(({ timestamp }) => {
    const key = Math.floor(now / timestamp) - 1;

    frequency[key] += 1;
  });

  const sum = frequency.reduce((acc, value) => acc + value, 0);
  const total = frequency.length;

  return sum / total;
};

module.exports = perMinute;

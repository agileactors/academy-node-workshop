/**
 * App utilities
 */

const { ENVVALUES } = require('../constants');

const nwsFormatDate = date => {
  const dateFormat = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ].join('/');

  const timeFormat = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].join(':');

  return [dateFormat, timeFormat].join(' ');
};

exports.nwsFormatDate = nwsFormatDate;

const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

exports.nwsGetEnvContent = nwsGetEnvContent;

const nwsConcatValues = args => {
  const values = Object.values(args);

  return values.reduce((txt, element) => {
    let result = txt;
    result += String(JSON.stringify(element));

    return result;
  }, '');
};

exports.nwsConcatValues = nwsConcatValues;

/**
 * Calculate the avarage message per minute
 * @param {*} messages
 */

const calcMessages = messages => {
  if (messages.length === 0) {
    return 0;
  }

  // get current time
  const now = Math.round(new Date().getTime() / 1000);

  // number of seconds from now to last message (timestamp desc)
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

exports.messagesPerMinute = calcMessages;

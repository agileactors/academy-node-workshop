/**
 * App utilities
 */

const { platform, arch, release, totalmem, freemem } = require('os');
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

const printSystem = () => {
  console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);
  console.log(
    `${((freemem() / totalmem()) * 100).toFixed(2)} % of your RAM is free.\n`
  );
};

exports.printSystem = printSystem;
exports.nwsConcatValues = nwsConcatValues;

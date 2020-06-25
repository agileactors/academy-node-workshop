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

const nwsConcatValues = args => {
  const values = Object.values(args);

  return values.reduce((txt, element) => {
    let result = txt;
    result += String(JSON.stringify(element));

    return result;
  }, '');
};

exports.nwsConcatValues = nwsConcatValues;

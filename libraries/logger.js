/**
 * Logger module
 *
 * Desc: Writes debug statements in console or in debug.log file
 * Usage: logger.log(value<string> | <object> | <array>)
 * Return: void
 *
 */

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const LOGS_PATH = path.join(cwd, 'logs');

// Do not edit
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

// Do not edit
const nwsConcatValues = args => {
  const values = Object.values(args);

  return values.reduce((txt, element) => {
    let result = txt;
    result += String(JSON.stringify(element));

    return result;
  }, '');
};

const logger = {
  logToFile: true,
  logToConsole: true,
  log(...args) {
    const now = new Date();
    const nowFormat = nwsFormatDate(now);

    args.unshift([nowFormat]);

    if (this.logToFile) {
      this.debug(args);
    }

    args.unshift('\n');

    if (this.logToConsole) {
      console.log.apply(null, args);
    }
  },
  debug(args) {
    const debugFile = path.join(LOGS_PATH, 'debug.log');
    const data = nwsConcatValues(args);

    fs.writeFile(debugFile, `${data}\n`, { flag: 'a' }, err => {
      if (err) {
        throw err;
      }
    });
  },
};

module.exports = logger;

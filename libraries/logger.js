/**
 * Logger module
 *
 * Desc: Writes debug statements in console or in debug.log file
 * Usage: debug(value) -> value <Any> : debug('hello node') | dedug({ error: some error }) | dedug([one, two, three])
 * Return: void
 *
 */

const fs = require('fs');

const formatDate = date => {
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

const logger = {
  logToFile: true,
  logToConsole: true,
  cnc(...args) {
    const values = Object.values(args);

    return values.reduce((txt, element) => {
      let result = txt;
      result += String(JSON.stringify(element));

      return result;
    }, '');
  },
  log(...args) {
    const now = new Date();
    const nowFormat = formatDate(now);

    args.unshift(nowFormat);

    if (this.logToFile) {
      this.debug(args);
    }

    args.unshift('\n');

    if (this.logToConsole) {
      console.log.apply(null, args);
    }
  },
  debug(args) {
    const txt = this.cnc(args);

    fs.writeFileSync('debug.log', `${txt}\n`, { flag: 'a' });
  },
};

module.exports = logger;

/**
 * Logger module
 *
 * Desc: Writes debug statements in console or in debug.log file
 * Usage: debug(value) -> value <Any> : debug('hello node') | dedug({ error: some error }) | dedug([one, two, three])
 * Return: void
 *
 */

const fs = require('fs');

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
    const nowFormat = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

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

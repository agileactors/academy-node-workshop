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
const { nwsFormatDate, nwsConcatValues } = require('./utilities');

const cwd = process.cwd();
const LOGS_PATH = path.join(cwd, 'logs');

const logger = {
  logToFile: true,
  logToConsole: false,
  log(...args) {
    const now = new Date();
    const nowFormat = nwsFormatDate(now);
    const debugFile = path.join(LOGS_PATH, 'debug.log');
    const data = nwsConcatValues(args);

    args.unshift(`${nowFormat}: `);

    if (this.logToFile) {
      try {
        fs.writeFileSync(debugFile, data, { flag: 'a' });
      } catch (error) {
        console.log(error);
      }
    }

    args.unshift('\n');

    if (this.logToConsole) {
      console.log.apply(null, args);
    }
  },
};

module.exports = logger;

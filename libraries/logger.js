/**
 * Logger module
 *
 * Writes debug statements in console or in debug.log file
 * Usage: logger.log(value<string> | <object> | <array>)
 * Return: void
 *
 */

const fs = require('fs');
const path = require('path');
const { nwsFormatDate, nwsConcatValues } = require('./utilities');

const cwd = process.cwd();
const LOGS_PATH = path.join(cwd, 'logs');

// Check if a `logs` directory exists
try {
  if (!fs.existsSync(LOGS_PATH)) {
    fs.mkdirSync(LOGS_PATH);
  }
} catch (err) {
  console.log(err);
}

const logger = {
  logToFile: true,
  logToConsole: true,
  log(...args) {
    const now = new Date();
    const nowFormat = nwsFormatDate(now);

    args.unshift(`${nowFormat}:`);
    const debugFile = path.join(LOGS_PATH, 'debug.log');
    const data = nwsConcatValues(args);

    if (this.logToFile) {
      try {
        fs.writeFileSync(debugFile, `${data}\n`, { flag: 'a' });
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

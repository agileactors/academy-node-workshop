/**
 * Task 1
 *
 * Implement the logger log function.
 * The function must use asynchronous apis and the debug.log file must be placed in the root folder.
 *
 * 1. It writes debug statements in the console
 * 2. it writes debug statements in the debug.log file
 * 3. It writes the timestamp at the beggining of each line
 * 3. Can handle multiple values and types such as <string | object | array> (bonus)
 *
 * Usage:
 * logger.log(value1, value2, value3)
 *
 * Result:
 * [now, message].
 * e.g ["day/month/year hours:minutes","some info" | { error: 'some error } | ['some item1', 'some item2']]
 */

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
  log(...args) {
    const now = new Date();
    const nowFormat = formatDate(now);

    /** TODO: provide implementation */
  },
};

module.exports = logger;

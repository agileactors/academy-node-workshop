/**
 * Task 1
 *
 * Implement the logger log function.
 * The function must use asynchronous apis and the debug.log file must be placed in the root folder.
 *
 * 1. It writes debug statements to the console
 * 2. it writes debug statements to the debug.log file
 * 3. It writes the timestamp at the beggining of each line
 * 3. Can handle multiple values and types such as <string | object | array> (bonus)
 *
 * Usage:
 * logger.log(value1<string | object | array>, value2)
 *
 * Result:
 * [now, message].
 * e.g
 * ["day/month/year hours:minutes","some info" | { error: 'some error } | ['some item1', 'some item2']]
 * ["day/month/year hours:minutes","another info" | { error: 'another error } | ['some item3', 'some item4']]
 */

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

const logger = {
  logToFile: true,
  logToConsole: true,
  log(...args) {
    const now = new Date();
    const nowFormat = nwsFormatDate(now);

    /** TODO: provide implementation */
  },
};

module.exports = logger;

/**
 * Task 1
 *
 * Implement the logger log and debug methods. The logger must use asynchronous apis
 * and the debug.log file must be placed in the root folder.
 *
 * 1. It writes debug statements in the console
 * 2. it writes debug statements in debug.log file
 * 3. It writes the timestamp at the beggining of each line
 * 3. Can handle multiple values and types such as <string | object | array> (bonus)
 *
 * Usage:
 * logger.log(value1, value2, value3)
 *
 * Result:
 * [timestamp, message].
 * e.g ["hours:minutes:seconds","some info" | { error: 'some error } | ['some item1', 'some item2']]
 */

const logger = {
  logToFile: true,
  logToConsole: true,
  log(...args) {},
};

module.exports = logger;

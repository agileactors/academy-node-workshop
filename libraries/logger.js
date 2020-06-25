const { nwsFormatDate } = require('./utilities');

/**
 * Task 2
 *
 * Implement the logger log function.
 *
 * 1. It should writes debug statements to the console
 * 2. it should writes debug statements to the debug.log file
 * 3. It should writes the timestamp at the beggining of each line
 * 4. It should write the current working directory path
 * 5. Can handle multiple values and types such as <string | object | array> (bonus)
 *
 * Usage:
 * logger.log(value1<string | object | array>, value2)
 *
 * Result:
 * [now, message].
 *
 * e.g
 * ["day:month:year hours:minutes","some info" | { error: 'some error } | ['some item1', 'some item2'], directory]
 */

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

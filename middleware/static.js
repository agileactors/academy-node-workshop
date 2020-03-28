const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// promisify readFile utility
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

/**
 * Task 1: Create variables that point to specific folders
 *
 * Create a variable that points to the project's root directory and another variable
 * that points to the 'static' folder.
 */

const middleware = async ({ request, response }, next) => {
  /**
   * Task 2: Write the static middleware
   *
   * When a request comes in, get the URL and try to open (from the 'static' folder)
   * a file with the URL as the filename. If the file exists send the contents to the
   * client else call the next middleware
   *
   */

  next(); // remove before start the task
};

module.exports = middleware;

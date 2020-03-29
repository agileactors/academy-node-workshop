const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const logger = require('../libraries/logger');

const rootDir = process.cwd();

/**
 *
 * Task 1: Create a handler that responds with html
 *
 * Use the fs module to read the chat.html file as a stream and send it
 * as the response.
 *
 * Hint: Use the pipe operator between the fs and response streams
 *
 */

const get = ({ response }) => {
  // implementation
};

/**
 *
 * Task 2: Create a handler that responds with JSON
 *
 * Use the global JSON object to create a JSON response containing a new
 * chat username. e.x { username: 'user_fh23FFGJ' }
 *
 * Hint 1: Use the async stringify method from the JSON global
 * Hint 2: Use 'shortid.generate()' to create a random ID for the username
 *
 */

const getUsername = async ({ response }) => {
  // implementation
};

module.exports = { get, getUsername };

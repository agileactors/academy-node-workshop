const fs = require('fs');
const initialEnvValues = require('./configuration');

const ENV_PATH = '.env';

const getEnvContent = () => {
  const { env } = initialEnvValues;

  const envValues = env.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

/**
 * Task 3: createEnv implementation
 *
 * Use the getEnvContent to get the .env content values
 * use the fs.writeFile to write the content values to a file with name .env in the root folder.
 * Print 
 
 * Hint: use utf8 encoding
 */

const createEnv = () => {
  try {
    const data = getEnvContent();

    /** provide your implementation * */
  } catch (error) {
    console.error(error);
  }
};

/**
 * Task 2: readEnv implementation
 *
 * Use the fs.readFile api to read the contents of the .env file
 * and print the contents of the file to the stdout.
 * If an error occurs throw an exception.
 *
 * Hint: use utf8 encoding
 */

const readEnv = () => {};

/**
 * Task 1: checkEnv implementation
 *
 * Use the fs.open api to check if the file .env exists in the project root folder.
 * If not exists print the message '"Starting configuration.." to the console and call createEnv function after 2 seconds and return'
 * If exists call the readEnv function.
 *
 * Hint: use appropriate flag for read and writing
 */

const checkEnv = () => {};

console.log('starting application..\n');
setTimeout(checkEnv, 1500);

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
 * Task 1: checkEnv implementation
 *
 * Use the fs api to check if the file .env exists in the project root folder.
 * If not exists print the message '"Starting configuration.." to the console and call createEnv'
 * If exists call the readEnv function.
 *
 * Hint: use appropriate flag for read and writing
 */

const checkEnv = () => {};

/**
 * Task 2: createEnv implementation
 *
 * use the fs api to write the content values(data) to a file with name .env in the root folder.
 * Print the message 'Finish configuration.' to the console.
 
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
 * Task 3: readEnv implementation
 *
 * Use the fs.readFile api to read the contents of the .env file and print the contents of the file to the console.
 * If an error occurs throw an exception.
 *
 * Hint: use utf8 encoding
 */

const readEnv = () => {};

checkEnv();

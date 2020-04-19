const { ENVVALUES } = require('./constants');

// path to the .env file
const ENV_PATH = '.env';

// path to the logs directory
const LOGS_DIR = './logs';

// Do not edit
const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

/**
 * Task 3: readEnv implementation
 *
 * Use the fs apis to read the content of the .env file and print it to
 * the console. Each value has to be printed in a new line.
 * If an error occurs throw an exception.
 *
 * Hint: use utf8 encoding
 */

const readEnv = () => {};

/**
 * Task 2: createEnv implementation
 *
 * Use the fs apis to write the content values (envFileContent variable) 
 * to a file with name .env in the app root folder.
 * When the operation completes print the message 'Finish configuration.' to the console.
 * If an error occurs throw an exception.
 
 * Hint: use utf8 encoding
 */

const createEnv = () => {
  try {
    const envFileContent = nwsGetEnvContent();

    // TODO: provide implementation
  } catch (error) {
    console.error(error);
  }
};

/**
 * Task 1: checkEnv implementation
 *
 * Check if a folder with name logs exists (LOGS_DIR) in the app root directory. If not exists create it.
 * Use the fs apis to check if the .env file exists in the app root directory.
 * If the file does not exists print the message "Creating configuration.." to the console and call the createEnv function
 * If the file exists print the message "Reading configuration.." to the console and call the readEnv function.
 *
 * Hint: use appropriate flag for read and writing
 */

const checkEnv = () => {};

// starting point
checkEnv();

/**
 * Task 4:
 *
 * use the os module and print the following information to the console:
 * `running on darwin x64 v19.0.3 and you have 56% of your RAM is free. }`;
 */

const { ENVVALUES } = require('./constants');

// path to the .env file
const ENV_PATH = '.env';

const getEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

/**
 * Task 2: createEnv implementation
 *
 * use the fs synchonous api to write the content values(data) to a file with name .env in the root folder.
 * Print the message 'Finish configuration.' to the console.
 * If an error occurs throw an exception.
 
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
 * Use the fs synchonous api to read the contents of the .env file and print the contents of the file to the console.
 * If an error occurs throw an exception.
 *
 * Hint: use utf8 encoding
 */

const readEnv = () => {};

/**
 * Task 1: checkEnv implementation
 *
 * Use the fs module synchonous api to check if the .env file exists in the project root folder.
 * If the file does not exists print the message "Creating configuration.." to the console and call the createEnv function
 * If the file exists print the message "Reading configuration.." to the console and call the readEnv function.
 *
 * Hint: use appropriate flag for read and writing
 */

const checkEnv = () => {};

checkEnv();

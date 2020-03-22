const fs = require('fs');
const path = require('path');
const initialEnvValues = require('./configuration');

/**
 * Task 1:
 *
 * Use the process global to get the current working directory (cwd)
 * Use the path api and update .env path using the path module and the cwd
 */
const ENV_PATH = '.env';

/**
 * Task 2:
 *
 * Use the process global to get the command line arguments passed.
 *
 */
const cliArgs = [];

const getEnvContent = () => {
  const { env } = initialEnvValues;

  /**
   * Task 3:
   *
   * If in cliArgs exists a value which matches a valid env value (e.g PORT | NODE_ENV)
   * e.g PORT=6001 use this value instead of the default
   *
   */
  const envValues = env.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

const createEnv = () => {
  try {
    const data = getEnvContent();

    fs.writeFile(ENV_PATH, data, 'utf8', err => {
      if (err) {
        throw err;
      }

      console.log('Finished .env configuration');
    });
  } catch (error) {
    console.error(error);
  }
};

const readEnv = () => {
  try {
    fs.readFile(ENV_PATH, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      console.log(`.env configuration: \n${data}\n`);
    });
  } catch (error) {
    console.error(error);
  }
};

const checkEnv = () => {
  fs.open(ENV_PATH, 'r+', err => {
    if (err) {
      console.log('Starting configuration..');
      return createEnv();
    }

    readEnv();
  });
};

/**
 * Task 4:
 *
 * use the process global object to handle uncaught exception errors
 * you should terminate the process after an error occurs
 */

/**
 * Task 5:
 *
 * If in cliArgs BYPASS exists and its value equals to 1 (BYPASS=1) skip the checkEnv
 */
checkEnv();

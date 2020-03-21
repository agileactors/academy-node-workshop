const fs = require('fs');
const initialEnvValues = require('./configuration');
const path = require('path');

/**
 * Task 1:
 *
 * Use the process global to get the current working directory (cwd)
 * Update .env path using the path module and the cwd
 */
const ENV_PATH = '.env';

const getEnvContent = () => {
  const { env } = initialEnvValues;

  /**
   * Task 2:
   *
   * Get the command line arguments passed. 
   * If a value matches an env value (e.g PORT | NODE_ENV)
   * e.g PORT=6001 use this value instead of the default
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
 * Task 3:
 *
 * use the process global object to handle uncaught exception errors
 * you should terminate the process after an error occurs
 */

setTimeout(() => {
  console.log('starting application..\n');
  checkEnv();
}, 1500);

const fs = require('fs');
const { ENVVALUES } = require('./constants');

/**
 * Task 1:
 *
 * Use the process global to get the current working directory (cwd)
 * Use the path api and update .env path and logs path using the cwd
 */

// path to the .env file
const ENV_PATH = '.env';

// path to the logs directory
const LOGS_DIR = './logs';

/**
 * Task 2:
 *
 * Use the process global to get the command line arguments passed.
 *
 */
const cliArgs = [];

const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

const createEnv = () => {
  try {
    const envFileContent = nwsGetEnvContent();

    fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
      if (err) {
        throw err;
      }

      console.log('Finished configuration');
    });
  } catch (error) {
    console.error(error);
  }
};

const readEnv = () => {
  try {
    const data = fs.readFileSync(ENV_PATH, 'utf8');

    console.log(`Found configuration: \n${data}\n`);
  } catch (error) {
    console.error(error);
  }
};

const checkEnv = () => {
  if (fs.existsSync(ENV_PATH)) {
    return readEnv();
  }

  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR);
  }

  createEnv();
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
 * If a command line argument with name 'BYPASS' passed skip the checkEnv
 */
checkEnv();

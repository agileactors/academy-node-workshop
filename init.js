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
const args = [];

// Do not edit
const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

const createEnv = () => {
  const envFileContent = nwsGetEnvContent();

  fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('Finished .env configuration');
  });
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
  fs.open(ENV_PATH, 'r+', err => {
    if (err) {
      return createEnv();
    }

    readEnv();
  });

  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR);
  }
};

/**
 * Task 3:
 *
 * If a command line argument with name 'BYPASS' passed skip the checkEnv
 */
checkEnv();

/**
 * Task 4:
 *
 * use the os module and print the following information to the console:
 * e.g console.log(`running on darwin x64 v19.0.3 and you have 56% of your RAM is free. }`);
 */

const fs = require('fs');
const path = require('path');
const { platform, arch, release, totalmem, freemem } = require('os');
const { ENVVALUES } = require('./constants');

// Dont edit
const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

/**
 * Task 1:
 *
 * Use path module to update the paths below based on the current working directory
 *
 */
const ENV_PATH = '.env';
const LOGS_DIR = './logs';

/**
 * Task 2:
 *
 * Use the process global to get the command line arguments passed.
 *
 */
const args = [];

function checkEnv() {
  console.log(
    `Your Operating System: ${platform()} ${arch()} ${release()}\n${(
      (freemem() / totalmem()) *
      100
    ).toFixed(2)} % of your RAM is free.\n `
  );

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR);
    }
  } catch (error) {
    console.log(error);
  }

  /**
   * Subtask 1:
   *
   * If a command line argument with name '--bypass' or '-b' passed skip the env configuration
   */

  fs.open(ENV_PATH, 'wx', err => {
    if (err) {
      if (err.code === 'EEXIST') {
        return readEnv(); // eslint-disable-line
      }

      throw err;
    }

    createEnv(); // eslint-disable-line
  });
}

function createEnv() {
  const envFileContent = nwsGetEnvContent();

  fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('Finished .env configuration');
  });
}

function readEnv() {
  try {
    const data = fs.readFileSync(ENV_PATH, 'utf8');

    console.log(`Found configuration: \n${data}\n`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Task 3:
 *
 * Use the process to handle uncaught exception errors
 */

// starting point
checkEnv();

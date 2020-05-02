const fs = require('fs');
const { platform, arch, release, totalmem, freemem } = require('os');
const { ENVVALUES } = require('./constants');

/**
 * Task 1:
 *
 * Use the process global to get the current working directory (cwd).
 * Use the path module and update the paths using the cwd.
 */

// path to .env file
const ENV_PATH = '.env';

// path to logs directory
const LOGS_DIR = './logs';

// Dont edit
const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

/**
 * Task 2:
 *
 * Use the process global to get the command line arguments passed.
 *
 */
const args = [];

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
  console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);
  console.log(
    `${((freemem() / totalmem()) * 100).toFixed(2)} % of your RAM is free.\n`
  );

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR);
    }
  } catch (error) {
    console.log(error);
  }

  /**
   * Task 3:
   *
   * If a command line argument with name '--bypass' or '-b' passed skip the env configuration
   */

  fs.open(ENV_PATH, 'wx', err => {
    if (err) {
      if (err.code === 'EEXIST') {
        return readEnv();
      }

      throw err;
    }

    createEnv();
  });
};

/**
 * Task 4:
 *
 * Use the process to handle uncaught exception errors
 */

// starting point
checkEnv();

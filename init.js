const fs = require('fs');
const { platform, arch, release, totalmem, freemem } = require('os');
const { nwsGetEnvContent } = require('./utilities');

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
 * Use the process to handle uncaught exception errors
 */

// log some information about the operating system
console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);

// log some information about the memory (ram) (number is rounded to two decimals)
console.log(
  `${((freemem() / totalmem()) * 100).toFixed(2)} % of your RAM is free.\n`
);

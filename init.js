const fs = require('fs');
const path = require('path');
const logger = require('./libraries/logger');
const { ENVVALUES } = require('./constants');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');
const LOGS_DIR = path.join(cwd, 'logs');
const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === 'BYPASS');

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
  try {
    const envFileContent = nwsGetEnvContent();

    fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
      if (err) {
        throw err;
      }

      /**
       * Task 1: Use the logger to log the message
       *
       * */
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
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR);
  }

  if (fs.existsSync(ENV_PATH)) {
    return readEnv();
  }

  createEnv();
};

process.on('uncaughtException', err => {
  /**
   * Task 2:
   *
   * Use the logger to log the error to debug.log
   */
  console.error(`Caught exception: ${err}\n`);
  process.exit();
});

if (bypassCheck) {
  checkEnv();
}

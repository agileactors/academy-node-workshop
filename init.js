const fs = require('fs');
const { platform, arch, release, totalmem, freemem } = require('os');
const path = require('path');
const { ENVVALUES } = require('./constants');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');
const LOGS_DIR = path.join(cwd, 'logs');
const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === '--bypass' || '-b');

/**
 * Task 1: Move to /libraries/utilities.js
 */
const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

function checkEnv() {
  console.log(
    `Your Operating System: ${platform()} ${arch()} ${release()}\n${(
      (freemem() / totalmem()) *
      100
    ).toFixed(2)} % of your RAM is free.`
  );

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR);
    }
  } catch (error) {
    console.log(error);
  }

  if (!bypassCheck) {
    fs.open(ENV_PATH, 'wx', err => {
      if (err) {
        if (err.code === 'EEXIST') {
          return readEnv(); // eslint-disable-line
        }

        throw err;
      }

      createEnv(); // eslint-disable-line
    });
  } else {
    console.log('Bypassing configuration..');
  }
}

function createEnv() {
  const envFileContent = nwsGetEnvContent();

  fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('Finished .env configuration.');
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

process.on('uncaughtException', err => {
  console.log(err.stack);
  logger.log(`pid ${process.pid}\n${err.message}`);
  process.exit(0);
});

// starting point
checkEnv();

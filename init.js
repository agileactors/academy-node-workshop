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

const createEnv = () => {
  const envFileContent = nwsGetEnvContent();

  fs.writeFile(ENV_PATH, envFileContent, 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('Finished .env configuration.');
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

  if (!bypassCheck) {
    fs.open(ENV_PATH, 'r+', err => {
      if (err) {
        const { code } = err;

        if (code === 'ENOENT') {
          return createEnv();
        }

        throw err;
      }

      readEnv();
    });
  } else {
    console.log('Bypassing configuration..');
  }
};

process.on('uncaughtException', err => {
  console.log(err.stack);

  /**
   * Task 3: Use the logger to log the message
   */
  console.log(`pid ${process.pid}\n${err}`);
  process.exit(0);
});

// starting point
checkEnv();

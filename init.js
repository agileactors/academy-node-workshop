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
  const data = nwsGetEnvContent();

  fs.writeFile(ENV_PATH, data, 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('Finished .env configuration');
  });
};

const readEnv = () => {
  fs.readFile(ENV_PATH, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    console.log(`.env configuration: \n${data}\n`);
  });
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

process.on('uncaughtException', err => {
  logger.log(err);
  process.exit();
});

if (!bypassCheck) {
  checkEnv();
}

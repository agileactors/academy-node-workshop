const fs = require('fs');
const path = require('path');
const logger = require('./libraries/logger');
const { nwsGetEnvContent, printSystem } = require('./libraries/utilities');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');
const LOGS_DIR = path.join(cwd, 'logs');
const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === '--bypass');

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
    logger.log(error.message);
  }
};

const checkEnv = () => {
  printSystem();

  try {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR);
    }
  } catch (error) {
    logger.log(error.message);
  }

  if (!bypassCheck) {
    fs.open(ENV_PATH, 'wx', err => {
      if (err) {
        if (err.code === 'EEXIST') {
          return readEnv();
        }

        throw err;
      }

      createEnv();
    });
  } else {
    console.log('Bypassing configuration..');
  }
};

process.on('uncaughtException', err => {
  console.log(err.stack);
  logger.log(`pid ${process.pid}: ${err.message}`);
  process.exit(0);
});

// starting point
checkEnv();

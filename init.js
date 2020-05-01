const fs = require('fs');
const path = require('path');
const { platform, arch, release, totalmem, freemem } = require('os');

const logger = require('./libraries/logger');
const { nwsGetEnvContent } = require('./libraries/utilities');

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

    logger.log('Finished .env configuration.');
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
    fs.open(ENV_PATH + 1, 'r+', err => {
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
  logger.log(`pid ${process.pid}\n${err}`);
  process.exit(0);
});

// startin point
checkEnv();

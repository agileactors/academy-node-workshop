const fs = require('fs');
const path = require('path');
const { platform, arch, release, totalmem, freemem } = require('os');

const logger = require('./libraries/logger');
const { nwsGetEnvContent } = require('./libraries/utilities');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');
const LOGS_DIR = path.join(cwd, 'logs');
const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === 'BYPASS');

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
  fs.readFile(ENV_PATH, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    console.log(`Found .env configuration: \n${data}\n`);
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
} else {
  console.log('Bypassing configuration...');
}

// log some information about the operating system
console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);

// log some information about the memory (ram) (number is rounded to two decimals)
console.log(
  `${((freemem() / totalmem()) * 100).toFixed(2)} % of your RAM is free.\n`
);

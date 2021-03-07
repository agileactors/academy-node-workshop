const fs = require('fs');
const { platform, arch, release, totalmem, freemem } = require('os');
const path = require('path');

const logger = require('./libraries/logger');
const { nwsGetEnvContent } = require('./libraries/utilities');

const ENV_PATH = path.join(__dirname, '.env');

const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === '--bypass' || '-b');

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

function checkEnv() {
  console.log(
    `Your Operating System: ${platform()} ${arch()} ${release()}\n${(
      (freemem() / totalmem()) *
      100
    ).toFixed(2)} % of your RAM is free.`
  );

  if (bypassCheck) {
    console.log('Bypassing configuration..');
    return;
  }

  const fileExists = fs.existsSync(ENV_PATH);
  if (!fileExists) {
    createEnv();
    return;
  }
  readEnv();
}

process.on('uncaughtException', err => {
  logger.log(`pid ${process.pid}\n${err.message}`);
  process.exit(0);
});

// starting point
checkEnv();

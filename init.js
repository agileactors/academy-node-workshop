const fs = require('fs');
const { platform, arch, release, totalmem, freemem } = require('os');
const path = require('path');
const { ENVVALUES } = require('./constants');

const ENV_PATH = path.join(__dirname, '.env');

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

/**
 * Task 3: Use the logger module to handle logging
 */

process.on('uncaughtException', err => {
  console.log(`pid ${process.pid}\n${err.message}`);
  process.exit(0);
});

// starting point
checkEnv();

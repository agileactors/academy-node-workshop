const fs = require('fs');
const path = require('path');
const logger = require('./libraries/logger');
const initialEnvValues = require('./configuration');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');
const args = process.argv.slice(2, process.argv.length);
const bypassCheck = args.some(arg => arg === 'BYPASS');

const getEnvContent = () => {
  const { env } = initialEnvValues;

  const argsArr = args.map(arg => {
    const [name, value] = arg.split('=');

    return {
      paramName: name,
      paramValue: value,
    };
  });

  const envValues = env.reduce((acc, envValue) => {
    const { name, value } = envValue;
    const arg = argsArr.find(({ paramName }) => paramName === name);

    acc.push(`${name}=${arg ? arg.paramValue : value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

const createEnv = () => {
  const data = getEnvContent();

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
};

process.on('uncaughtException', err => {
  logger.log(err);
  process.exit();
});

if (!bypassCheck) {
  checkEnv();
}

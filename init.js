const fs = require('fs');
const initialEnvValues = require('./configuration');

const ENV_PATH = '.env';

const getEnvContent = () => {
  const { env } = initialEnvValues;

  const envValues = env.reduce((acc, envValue) => {
    const { name, value } = envValue;

    acc.push(`${name}=${value}`);
    return acc;
  }, []);

  return envValues.join('\n');
};

const createEnv = () => {
  try {
    const data = getEnvContent();

    fs.writeFile('.env', data, 'utf8', err => {
      if (err) {
        throw err;
      }

      console.log('Finished .env configuration');
    });
  } catch (error) {
    console.error(error);
  }
};

const readEnv = () => {
  try {
    fs.readFile('.env', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      console.log(`.env configuration: \n${data}\n`);
    });
  } catch (error) {
    console.error(error);
  }
};

const checkEnv = () => {
  const envPath = '.env';

  fs.open(envPath, 'r+', err => {
    if (err) {
      console.log('Starting configuration..');
      return createEnv();
    }

    readEnv();
  });
};

console.log('starting application..\n');
setTimeout(checkEnv, 1500);

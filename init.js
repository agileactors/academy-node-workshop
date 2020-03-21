const fs = require('fs');
const path = require('path');
const initialEnvValues = require('./configuration');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');

const getEnvContent = () => {
  const { env } = initialEnvValues;

  const argsArr = process.argv.slice(2, process.argv.length).map(arg => {
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
  try {
    const data = getEnvContent();

    fs.writeFile(ENV_PATH, data, 'utf8', err => {
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
    fs.readFile(ENV_PATH, 'utf8', (err, data) => {
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
  fs.open(ENV_PATH, 'r+', err => {
    if (err) {
      console.log('Starting configuration..');
      return createEnv();
    }

    readEnv();
  });
};

process.on('uncaughtException', err => {
  console.error(err);
  process.exit();
});

setTimeout(() => {
  console.log('starting application..\n');
  checkEnv();
}, 1500);

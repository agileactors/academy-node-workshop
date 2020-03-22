const fs = require('fs');
const path = require('path');
const logger = require('./libraries/logger');
const initialEnvValues = require('./configuration');

const cwd = process.cwd();
const ENV_PATH = path.join(cwd, '.env');

const getEnvContent = () => {
  const { env } = initialEnvValues;
  const args = process.argv;

  const argsArr = args.slice(2, process.argv.length).map(arg => {
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
    /**
     * Task 1:
     *
     * Use the logger to log the error to debug.log
     */
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
    /**
     * Task 2:
     *
     * Use the logger to log the error to debug.log
     */
    console.error(error);
  }
};

const checkEnv = () => {
  fs.open(ENV_PATH, 'r+', err => {
    if (err) {
      /**
       * Task 3:
       *
       * Use the logger to log the error to the debug.log
       */
      console.error(err);
      return createEnv();
    }

    readEnv();
  });
};

process.on('uncaughtException', err => {
  /**
   * Task 4:
   *
   * Use the logger to log the error to debug.log
   */
  console.error(err);
  process.exit();
});

checkEnv();

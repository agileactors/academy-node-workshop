/**
 * App utilities
 */

const { ENVVALUES } = require('./constants');

const nwsGetEnvContent = () => {
  const envValues = ENVVALUES.reduce((acc, envValue) => {
    const { name, value } = envValue;

    return [...acc, `${name}=${value}`];
  }, []);

  return envValues.join('\n');
};

exports.nwsGetEnvContent = nwsGetEnvContent;

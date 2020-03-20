const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const envs = require('./env-variables.json');

// get the current working directory
const cwd = process.cwd();

// use the readline interface for prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const makequestion = ({ question }) => {
  return () =>
    new Promise(resolve =>
      rl.question(question, answer => {
        resolve(answer);
      })
    );
};

const setup = async () => {
  const answers = [];
  const questions = envs.variables.map(makequestion);

  for await (const question of questions) {
    answers.push(await question());
  }

  const stream = fs.createWriteStream(path.join(cwd, '.env'));

  answers.forEach((answer, i) =>
    stream.write(`${envs.variables[i].name}=${answer}\n`)
  );

  stream.close();
  rl.close();

  return answers;
};

const checkEnv = () => {
  const envPath = path.join(cwd, '.env');

  fs.open(envPath, 'r', async err => {
    if (err) {
      setup();
      return;
    }

    try {
      fs.accessSync(envPath, fs.constants.R_OK);
      const envContents = fs.readFileSync(envPath, 'utf8');

      rl.question(
        `You have a configuration file. \n${envContents}\n Do you want to overwrite it? (yes/no) `,
        answer => {
          if (answer === 'yes') {
            setup();
            return;
          }

          rl.close();
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
};

checkEnv();

# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the `fs`, `path` and `os` build-in modules.

The **fs module** provides an API for interacting with the file system. All file system operations have synchronous and asynchronous forms.

Usage:

```js
// The Node.js File System (fs) module can be imported using the following syntax.

const fs = require('fs');

/**
 * Reading a file with node.js
 *
 * fs.readFile(file, callback)
 */

fs.readFile('example.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
});

// synchronous version (blocks the event-loop)

const data = fs.readFileSync('example.txt', { encoding: 'utf-8' });

/**
 * Writing a file with node.js
 *
 * fs.writeFile(file, data, callback)
 */

fs.writeFile('example.txt', 'Learn Teach Code Seoul', err => {
  if (err) {
    throw err;
  }
  console.log('Data written successfully!');
});
```

## Synchronous vs Asynchronous

- Every method in the fs module has synchronous as well as asynchronous forms.

- Asynchronous methods take the last parameter as the completion function callback and the first parameter of the callback function as error.

- It is better to use an asynchronous method instead of a synchronous method, as the former never blocks a program during its execution, whereas the second one does.

- **Asynchronous programming will likely take some time to grasp and master.**

The **os module** provides operating system-related utility methods and properties.

Usage:

```js
const os = require('os');

const { platform, arch, release, totalmem, freemem } = os;

console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);
```

Documentation:

- [fs](https://nodejs.org/dist/latest-v13.x/docs/api/fs.html#fs_file_system)
- [os](https://nodejs.org/api/os.html#os_os)

## Branch Tasks

Use the fs apis (synchronous or asynchronous) to create a `.env` file for our application. The .env holds the environmental variables that our app needs to run such as `DB_USER`, `DB_PASSWORD`, `PORT` etc.

1. Provide the **checkEnv** implementation which checks if a `.env` file exists.

- Subtask 1: Use the **os** module to print operating system information to the console.

- Subtask 2: In the **checkEnv** implementation check if a directory with name `logs` exists at the root directory. if not create it.

2. Provide the **createEnv** implementation which creates the .env file if not exists.

3. Provide the **readEnv** implementation which read the contents of .env if exists.

Open the **init.js** file placed in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm run setup
```

**Note**: The functions which have a prefix `nws` are only for internal use. You do not have to edit them.

The project directory should be:

 <pre>
 |--root
    |-- .env
    |-- README.md
    |-- constants.js
    |-- init.js
</pre>

## Covers

- File System module (fs)
- Os module (os)

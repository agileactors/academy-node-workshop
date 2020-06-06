# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the `fs`, `path` and `os` build-in modules.

The **fs module** provides an API for interacting with the file system. All file system operations have synchronous and asynchronous forms.

Usage:

```js
const fs = require('fs');

// synchronous api
fs.unlink('/tmp/hello', err => {
  if (err) {
    throw err;
  }

  console.log('successfully deleted /tmp/hello');
});

// asynchronous api
try {
  fs.unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error..
}
```

The **os module** provides operating system-related utility methods and properties.

Usage:

```js
const os = require('os');

const { platform, arch, release, totalmem, freemem } = os;

console.log(`Your Operating System: ${platform()} ${arch()} ${release()}`);
```

The **path module** provides utilities for working with file and directory paths.

Usage:

```js
const path = require('path');

const logsPath = path.join(__dirname, 'logs');
```

Documentation:

- [fs](https://nodejs.org/dist/latest-v13.x/docs/api/fs.html#fs_file_system)
- [os](https://nodejs.org/api/os.html#os_os)
- [path](https://nodejs.org/api/path.html)

## Branch Tasks

Use the fs apis (synchronous or asynchronous) to create a `.env` file for our application. The .env holds the environmental variables that our app needs to run such as `DB_USER`, `DB_PASSWORD`, `PORT` etc.

1. Use the **path** module to update the .env (`ENV_PATH`) and logs (`LOGS_DIR`) paths.

2. Provide the **checkEnv** implementation which checks if a `.env` file exists.

- Subtask 1: Use the **os** module to print operating system information to the console.

- Subtask 2: In the **checkEnv** implementation check if a directory with name `logs` exists at the root directory.

4. Provide the **createEnv** implementation which creates the .env file if not exists.

5. Provide the **readEnv** implementation which read the contents of .env if exists.

Open the **init.js** file placed in the root directory of the app to start writing your code. To start the application and test your code issue the following command in a terminal:

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
    |-- logs
</pre>

## Covers

- File System module (fs)
- Os module (os)

# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the `fs`, and `os` build-in modules.


The __fs module__ provides an API for interacting with the file system.

Usage:

```js
const fs = require('fs');
```

The __os module__ provides operating system-related utility methods and properties.

Usage:

```js
const os = require('os');
```

Documentation:

* [fs](https://nodejs.org/dist/latest-v13.x/docs/api/fs.html#fs_file_system)
* [os](https://nodejs.org/api/os.html#os_os)

## Branch Tasks

Use the fs apis (synchronous or asynchronous) to create a `.env` file for our application. The .env holds the environmental variables that our app needs to run such as the DB_USER, DB_PASSWORD, PORT etc.

1. Provide the **checkEnv** implementation which checks if a `.env` file exists.
2. Also in the **checkEnv** implementation check if a directory with name `logs` exists at the root directory of the app.
3. Provide the **createEnv** implementation which creates the .env file if not exists.
4. Provide the **readEnv** implementation which read the contents of .env if exists.
5. Use the **os** module to print operating system information the console.

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
    |-- logs
</pre>

## Covers

- File System module (fs)
- Os module (os)

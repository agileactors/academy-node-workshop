# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the fs, path and os buildins module.


The fs module provides an API for interacting with the file system.

Usage:

```js
const fs = require('fs');
```

The os module provides operating system-related utility methods and properties.

Usage:

```js
const os = require('os');
```

Documentation:

* [fs](https://nodejs.org/dist/latest-v13.x/docs/api/fs.html#fs_file_system)
* [os](https://nodejs.org/api/os.html#os_os)

## Branch Tasks

Use the fs apis (synchronous or asynchronous) to create a `.env` file for our application. The .env holds the environmental variables that our app needs to run such as PORT, NODE_ENV etc. 

4. Use the **os** module to print operating system information the console.
2. Provide the **checkEnv** implementation which checks if the .env file exists in the root folder.
3. Provide the **readEnv** implementation which reads the contents of .env if exists.
4. Provide the **createEnv** implementation which creates the .env file.
5. Check if a directory with name `logs` exists at the root directory of the app.

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

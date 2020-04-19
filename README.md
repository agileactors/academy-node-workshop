# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the **process** global object in Node.js and the **path** build-in module.

The process object is a global that provides information about, and control over, the current Node.js process.

Usage:

```js
const env = process.env;
```

It is global so you can use it directly in the code.

The path module provides utilities for working with file and directory paths.

Usage:

```js
const path = require('path');
```

Documentation:

* [process](https://nodejs.org/api/process.html)
* [path](https://nodejs.org/dist/latest-v13.x/docs/api/path.html#path_path)

Open the **init.js** file placed in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm run setup
```

**Note**: The functions which have a prefix `nws` are only for internal use. You do not have to edit them.

## Branch Tasks

1. Use the **process** global to get the current working directory.
2. Use the **path** module to update the .env (`ENV_PATH`) and logs(`LOGS_DIR`) paths using the current working directory.
3. Use the **process** global to read the command line arguments passed.
4. Use the **process** global object to handle uncaught exception errors.

## Covers

- Globals (process/console)
- os module (os)

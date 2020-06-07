# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the Node.js module system.

We will implement two custom modules.

- **logger.js** for handling the logging of our application.
- **utilities.js** for implementing utilities functions.

Usage:

```js
const logger = require('./libraries/logger');
const { nwsGetEnvContent } = require('./libraries/utilities');
```

Documentation:

- [modules](https://nodejs.org/api/modules.html)

## Branch Tasks

1. Move the `nwsGetEnvContent` utility function to `/libraries/utilities.js` and use the **exports** object to export it. Then use it in the `init.js` file.

2. Continue the implementation of the **logger.js** module in `/libraries/logger.js`.

3. Use the logger in the **init.js** file to handle logging.

Open the **logger.js** file located in the libraries directory of the app to start writing your code.

To start the application and test your code run the following command in a terminal:

```
npm run setup
```

**Note**: The functions which have a prefix `nws` are only for internal use. You do not have to edit them.

The project directory should be:

 <pre>
 |--root
    |-- libraries
    |-- logs
        |-- debug.log
    |-- .env
    |-- README.md
    |-- constants.js
    |-- init.js
</pre>

## Covers

- Node.js module system
- Node.js debugging

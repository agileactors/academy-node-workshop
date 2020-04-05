# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the Node.js module system. 

We will implement a custom module named **logger.js** to handle the logging of our application. The logger file exists in the libraries folder.

Usage:

```js
const logger = require('./libraries/logger');
```

Documentation:

* [modules](https://nodejs.org/api/modules.html)

## Branch Tasks

1. Continue the implementation of the logger.js module
2. Use the logger in the __init.js__ file to handle logging

Open the **logger.js** file placed in the libraries directory of the app to start writing your code.
To start the application and test your code issue the following command in a terminal:

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
    |-- logs
</pre>

## Covers

- Node.js module system
- Node.js debugging

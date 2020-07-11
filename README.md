# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the **process** global object in Node.js and the **path** build-in module.

The process object is a global that provides information about, and control over, the current Node.js process. 

As a global, it is always available to Node.js applications without using require(). It can also be explicitly accessed using require():

```js
const process = require('process');
const currentWorkingDir = process.cwd();
```

The **path** module provides utilities for working with file and directory paths. It can be accessed using:

```js
const path = require('path');
```

Documentation:

- [process](https://nodejs.org/api/process.html)
- [__dirname](https://nodejs.org/docs/latest/api/modules.html#modules_dirname)
- [path](https://nodejs.org/api/path.html)

## Branch Tasks

1. Use the **process** global to get the current working directory and update the **.env** and **logs** paths using the **path** module.

2. Use the **process** global to read the command line arguments passed.

- Subtask 1: If a command line argument with name '--bypass' or '-b' passed skip the env configuration

3. Use the **process** global object to handle uncaught exception errors.

Open *__init.js__* file located in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm run setup
```

**Note**: *The functions which have a prefix `nws` are only for internal use. You do not have to edit them.*

## Covers

- Globals (process/console)
- Path (build in module)

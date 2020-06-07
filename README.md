# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the **process** global object in Node.js and the **path** build-in module.

The process object is a global that provides information and control over the current Node.js process.

**It is global so you can use it directly in the code.**

The **path** module provides utilities for working with file and directory paths. It can be accessed using:

```
const path = require('path');
```

Documentation:

- [process](https://nodejs.org/api/process.html)
- [path](https://nodejs.org/api/path.html)

Open the **init.js** file located in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm run setup
```

**Note**: The functions which have a prefix `nws` are only for internal use. You do not have to edit them.

## Branch Tasks

1. Use the **process** global to get the current working directory and update the **.env** and **logs** paths using the **path** module.

2. Use the **process** global to read the command line arguments passed.

- Subtask 1: If a command line argument with name '--bypass' or '-b' passed skip the env configuration

3. Use the **process** global object to handle uncaught exception errors.

## Covers

- Globals (process/console)
- Path (build in module)

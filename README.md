# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the **process** global object in Node.js and the **Path** build-in module.

The process object is a global that provides information about, and control over, the current Node.js process.
It is global so you can use it directly in the code.

The path module provides utilities for working with file and directory paths.

Usage:

```js
const path = require('path);
```

Docs:

- [path](https://nodejs.org/dist/latest-v13.x/docs/api/path.html#path_path)
- [process](https://nodejs.org/api/process.html)

## Branch Tasks

1. Use the **process** global to get the current working directory.
2. Use the **path** module to update the .env (ENV_PATH) path using the current working directory.
3. Use the **process** global to read the command line arguments.
4. Use the **process** global object to handle uncaught exception errors.

## Covers

- Path module (path)
- Node.js globals (process)

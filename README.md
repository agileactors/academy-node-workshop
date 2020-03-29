# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the File System module(fs).

The fs module provides an API for interacting with the file system. It can be accessed using:

```
const fs = require('fs');
```

Docs:

- https://nodejs.org/dist/latest-v13.x/docs/api/fs.html#fs_file_system

## Branch Tasks

Use the fs **synchronous** api to create a .env file for our application. The .env holds the environmental variables that our app needs to run such as PORT, NODE_ENV etc.

1. Provide the **checkEnv** implementation which checks if the .env file exists in the root folder (synchronous).
2. Provide the **readEnv** implementation which reads the contents of .env if exists (synchronous).
3. Provide the **createEnv** implementation which creates the .env file (synchronous).

Open the ***init.js*** file placed in the root folder of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm run init
```

## Covers

- File System module (fs)

# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the File System(fs) and the path module. 

The fs module provides an API for interacting with the file system. The path module provides utilities for working with file and directory paths.

Usage:
```
const fs = require('fs);
const path = require('path);
```

We will use the fs to create a .env file for our application. The .env holds the environmental variables that our app needs to run.

## Branch Tasks

1. Provide the checkEnv implementation which checks if the .env file exists in the root folder.
2. Provide the readEnv implementation which reads the contents of .env if exists
3. Provide the createEnv implementation which creates the .env file
4. Use the path module to update the .env path (ENV_PATH)

## Covers

- File System module (fs)
- Path mmodule (path)

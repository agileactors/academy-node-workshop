# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the File System module(fs). 

The fs module provides an API for interacting with the file system.


Usage:
```
const fs = require('fs);
```

We will use the fs synhronous api to create a .env file for our application. 
The .env holds the environmental variables that our app needs to run.

## Branch Tasks

1. Provide the __checkEnv__ implementation which checks if the .env file exists in the root folder (synchronous).
2. Provide the __readEnv__ implementation which reads the contents of .env if exists (synchronous).
3. Provide the __createEnv__ implementation which creates the .env file (synchronous).

## Covers

- File System module (fs)
- Path module (path)

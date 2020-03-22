# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will use the File System(fs) module to create a .env file
for our application. The .env holds the environmental variables that our app needs to run.
It must has the following format:

NODE_ENV=development
DB_HOST=cluster0-diifo.mongodb.net/aa_book_db
DB_USER=aa_user
DB_PASSWORD=lWjUsESlmmLxvaLg
PORT=8001

## Branch Tasks

1. Provide the checkEnv implementation which checks if the .env file exists in the root folder.
2. Provide the readEnv implementation which reads the contents of .env if exists
3. Provide the createEnv implementation which creates the .env file
4. Use the path module to update the .env path (ENV_PATH)

## Covers

- File System module (fs)
- Path mmodule (path)

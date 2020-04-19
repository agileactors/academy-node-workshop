# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will build a middleware that handles static files.

Some request want to just access a file in our servers and not hit an endpoint.
The static middleware is responsible to inspect the request, see if the request is for a file and if it is load and return the file to client otherwise continue with the next middleware in the pipeline.


## Branch Tasks

1. Middlewares
2. Create variables that point to specific folders.
3. Write the static middleware.

## Covers

- File System Module
- Util Module

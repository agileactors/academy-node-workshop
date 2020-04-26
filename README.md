# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will build a middleware that handles static files.

Static files could be `.css` or `images` files.

For example the `welcome.html` file placed in the `views` folder needs the `styles.css` file.

```
<link rel="stylesheet" href="css/styles.css" />
```

So the request (`HTTP GET`) wants to access the file (`styles.css`) in our servers and not hit an endpoint.

The static middleware is responsible to inspect the request, check if the request is for a file and if it is, return the file to the client otherwise continue with the next middleware in the pipeline.

## Branch Tasks

1. Get the static files folder
2. Middlewares

## Covers

- File System Module
- Util Module

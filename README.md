# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will build a middleware that handles static files. Static files could be any file extension type such as  `.html`, `.js`, `.css`, `.png`, `.svg`, `.jpg` etc.

_Note: You can preview the __MIMETYPES__ in the `constants.js` file._

For example the __welcome.html__ file located in the __views__ folder needs the `styles.css` file.

```
<link rel="stylesheet" href="css/styles.css" />
```

So the request wants to access the file (`styles.css`) in the server and not hit an endpoint.

HTTP GET Request: 

```
http://localhost:8001/css/styles.css
```

The static middleware is responsible to inspect the request, check if the request is for a file and if it is, return the file to the client otherwise continue with the next middleware in the pipeline.

## Branch Tasks

1. Get the static files folder
2. Middlewares

## Covers

- File System Module
- Util Module

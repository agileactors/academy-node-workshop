# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the http module. We will create a simple web server to handle HTTP requests.

Usage:

```js
const http = require('http');
```

Documentation:

- [http](https://nodejs.org/api/http.html#http_http)

## Branch Tasks

1. Create an http server using the `http` module. When the server is up use the logger to 
log the message `Server listening on port ${PORT}`. The ``PORT`` is the listening PORT of the server.
2. Create a simple http router. The router should handle the following `HTTP GET` requests:
    * Route: `'/' => <h1>Index Page</h1>`
    * Route: `/about' => <h1>About Page</h1>`

Open the **server.js** file placed in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm start
```

**Hints:** 

- Use your favorite browser to test the requests
`e.g http://localhost:8001/about`

- Use curl to test the requests
`e.g curl localhost:8001/about`

## Covers

- http module

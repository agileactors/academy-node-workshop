# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the http module and the util module. We will create a simple web server to handle HTTP requests.

Usage:

```js
const http = require('http');
```

The util module supports the needs of Node.js internal APIs. Many of the utilities are useful for application and module developers as well.

Usage:

```js
const util = require('util');
```

Documentation:

- [http_http](https://nodejs.org/api/http.html#http_http)
- [util](https://nodejs.org/api/util.html)

## Branch Tasks

1. Create an http server using the `http` module. When the server is up use the logger to
   log the message `Server listening on port ${PORT}`.
2. Use the `process` global to get the `PORT` number from the .env file. Then start the server at this `PORT`.
3. Use the `util` module to parse the `request.url` property.
4. Create a simple http router. The router should handle the following `HTTP GET` requests:
   - Route: `'/' => <h1>Index Page</h1>`
   - Route: `/about' => <h1>About Page</h1>`

Open the **server.js** file placed in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm start
```

**Hints:**

- Use the `process.env` property to get the environmental variables.

- Use the `DevTools` to debug your code.

- Use your favorite browser to test the requests
  `e.g http://localhost:8001/about`

## Covers

- http module
- debugging

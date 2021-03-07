# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the http module and the util module. We will create a simple web server to handle HTTP requests.

Usage:

```js
const http = require('http');
```

Documentation:

- [http_http](https://nodejs.org/api/http.html#http_http)

## Branch Tasks

1. Create a simple http server that responds with the text "Hello World!".

2. Create a simple http router. The router should handle the following **HTTP GET** requests:

   Route `/`:

   - method: GET
   - response (html): \<h1>Index Page\</h1>

   Route `/chat`:

   - method: GET
   - response (html): \<h1>Chat page\</h1>

3. Catch unhandled errors

Open the **server.js** file placed in the root directory of the app to start writing your code.

To start the application and test your code issue the following command in a terminal:

```
npm start
```

**Hints:**

- Use the `process.env` property to get the environmental variables.

- Use the `DevTools` to debug your code.

- Use your favorite browser to test the requests
  `e.g http://localhost:8001/chat`

## Covers

- http module
- url module

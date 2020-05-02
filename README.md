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

1. Use the `process` global to get the `PORT` number from the **.env** file.
2. Create an http server using the `http` module.
3. Then start the server using the **listen** method and pass the **PORT** number. When the server is up use the logger to
   log the message:

   `Server listening on port ${PORT}`.

4. Create a simple http router. The router should handle the following **HTTP GET** requests:

   Route `/home`:

   - method: GET
   - response (html): views/index.html file

   Route `/chat`:

   - method: GET
   - response (html): \<h1>Chat page</h1>

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

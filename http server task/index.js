const http = require("http");

const server = http.createServer((req, res) => {
  const method = req.method;

  const path = req.url;

  switch (method) {
    case "GET":
      switch (path) {
        case "/":
          return req.writeHead(200).end("Hello from server");
        case "/contact-us":
          return req.writeHead(200).end("Sure, the name is Prime.");
      }
      break;

    case "POST":
      switch (path) {
        // const data = req.body
        case "/contact-us":
          return res.writeHead(200).end("The db with the data is created.");
      }
  }
});

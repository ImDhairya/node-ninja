const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log(`Incoming request at ${Date.now()}`);
  console.log(req.headers, "Headers");

  res.writeHead(201, "Okay it is ended");
  res.end("Done")
});

server.listen(3010, () => {
  console.log(`Server is listening at 3000`);
});

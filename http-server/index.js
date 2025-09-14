const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {"content-type": "application/json"});
  res.end("Thanks for visiting my server");
});


server.listen(3000, function () {
  console.log("Server running on port ", 3000);
});

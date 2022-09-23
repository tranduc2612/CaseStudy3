const http = require("http");
const fs = require("fs");
const qs = require("qs");
const router = require("./src/Router/Router.js");
const server = http.createServer(router);

server.listen(3000, () => {
  console.log("listening !");
});

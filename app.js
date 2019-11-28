const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan"); // gives information about requests
const path = require("path");

const app = express();

app.use(morgan("tiny"));

app.get("/", function(req, res) {
  // res.send("Hello from my library app");
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.listen(3000, function() {
  debug(`listening on port ${chalk.green("3000")}`);
});

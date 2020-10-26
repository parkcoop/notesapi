require("dotenv").config();

const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const app = express()

let server = http.createServer(app);

server.on("error", error => {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    switch (error.code) {
      case "EACCES":
        console.error(`Port ${process.env.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});
app.use(bodyParser.json())
// app.use(cookieParser)
app.use("/", require('./router'));

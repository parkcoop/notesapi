require("dotenv").config();

const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express()

let server = http.createServer(app);

mongoose.connect('mongodb+srv://parkcoop:lol@react-graphql.wwkja.mongodb.net/notes?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("🚀 💾 📶 Connected to DB!")
});



server.on("error", error => {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    switch (error.code) {
      case "EACCES":
        console.error(`Port ${5000} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`Port ${5000} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
});

server.listen(5000, () => {
    console.log(`Listening on http://localhost:${5000}`);
});
app.use(bodyParser.json())
// app.use(cookieParser)
app.use("/", require('./router'));

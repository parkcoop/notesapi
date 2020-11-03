require("dotenv").config();

const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

let server = http.createServer(app);

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("🚀 💾 📶 Connected to DB!");
});

server.on("error", (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            console.error(
                `Port ${process.env.PORT} requires elevated privileges`,
            );
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
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
// app.use(cookieParser)
app.use("/", require("./router"));

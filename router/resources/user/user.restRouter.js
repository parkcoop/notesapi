const express = require("express");
const userRouter = express.Router();
const controller = require("./user.controller");

userRouter.post("/signup", controller.signUp);
userRouter.post("/login", controller.login);

module.exports = userRouter;

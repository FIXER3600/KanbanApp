const express = require("express");
const userController = require('../adapters/controller/UserController');

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/users", userController.findAll);

module.exports = userRouter;

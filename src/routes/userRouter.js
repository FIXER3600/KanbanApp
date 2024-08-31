const express = require("express");
const userController = require('../adapters/controller/UserController');

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/all", userController.findAll);

module.exports = userRouter;

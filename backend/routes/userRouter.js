const express = require("express");
const {getUsers , getUser , getUserRegex} = require("../middleware/user.js");

const userRouter = express.Router();

userRouter.get("/" , getUsers);

userRouter.get("/:id" , getUser);

userRouter.get("/search/:username" , getUserRegex);

module.exports = userRouter;
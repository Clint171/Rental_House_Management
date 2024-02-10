import express from "express";
import signup from "../service/signup.js";
import login from "../service/login.js";

const router = express.Router();

router.post("/signup" , signup.addAdmin);

router.post("/login" , login.loginAdmin);

export default router;
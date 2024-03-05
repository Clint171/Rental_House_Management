import express from "express";
import login from "../service/login.js";

const router = express.Router();

router.post("/login", login.loginUser);

export default router;
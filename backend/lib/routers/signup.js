import express from "express";
import service from "../service/signup.js";

const router = express.Router();

router.post("/signup", service.signupVisitor);

export default router;
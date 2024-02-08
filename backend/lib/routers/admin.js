import express from "express";
import signup from "../service/signup.js";
import login from "../service/login.js";

const router = express.Router();

router.post("/signup" , signup.addAdmin);

router.post("/login" , login.loginAdmin);

//router.post("/landlords" , service.addLandlord);

export default router;
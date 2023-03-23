import express from "express";
import { googleAuth, register, login } from "../controllers/auth.js";

const router = express.Router();

//GOOGLE AUTH
router.post("/google", googleAuth);

// CREATE A USER
router.post("/register", register);

//SIGN IN
router.post("/login", login);

export default router;

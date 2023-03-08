import express from "express";
import { googleAuth } from "../controllers/auth.js";

const router = express.Router();

//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;

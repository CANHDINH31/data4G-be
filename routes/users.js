import express from "express";
import { getUser, toggleFavourite } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.post("/toggle-favourite", toggleFavourite);

export default router;

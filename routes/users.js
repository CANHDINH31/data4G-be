import express from "express";
import { getUser, toggleFavourite, updateInfo } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.post("/toggle-favourite", toggleFavourite);
router.put("/update-info/:id", updateInfo);

export default router;

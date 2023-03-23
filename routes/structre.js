import express from "express";
import { updateStructre, getStructre } from "../controllers/structre.js";

const router = express.Router();

router.put("/:id", updateStructre);
router.get("/", getStructre);

export default router;

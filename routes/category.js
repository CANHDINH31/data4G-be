import express from "express";
import {
  createCategory,
  getListCategory,
  searchCategory,
  deleteCategory,
  getInfoCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/delete-category", deleteCategory);
router.get("/search", searchCategory);
router.get("/:id", getInfoCategory);
router.put("/:id", updateCategory);
router.post("/", createCategory);
router.get("/", getListCategory);

export default router;

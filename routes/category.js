import express from "express";
import {
  createCategory,
  getListCategory,
  getCategoryBySlug,
  searchCategory,
  deleteCategory,
  getInfoCategory,
  updateCategory,
  getListMenu,
} from "../controllers/category.js";

const router = express.Router();

router.post("/delete-category", deleteCategory);
router.get("/get-by-slug", getCategoryBySlug);
router.get("/search", searchCategory);
router.get("/listmenu", getListMenu);
router.get("/:id", getInfoCategory);
router.put("/:id", updateCategory);
router.post("/", createCategory);
router.get("/", getListCategory);

export default router;

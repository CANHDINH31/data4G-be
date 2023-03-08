import express from "express";
import {
  createProduct,
  deleteProduct,
  getListProduct,
  getInfoProduct,
  updateProduct,
  searchProduct,
  addToCategory,
} from "../controllers/product.js";

const router = express.Router();

router.post("/delete-product", deleteProduct);
router.post("/add-to-category", addToCategory);
router.get("/search", searchProduct);
router.get("/:id", getInfoProduct);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.get("/", getListProduct);

export default router;

import express from "express";
import {
  createService,
  getListService,
  searchService,
  deleteService,
  updateService,
  addToCategory,
} from "../controllers/service.js";

const router = express.Router();

router.post("/add-to-category", addToCategory);
router.post("/delete-service", deleteService);
router.get("/search", searchService);
router.put("/:id", updateService);
router.post("/", createService);
router.get("/", getListService);

export default router;

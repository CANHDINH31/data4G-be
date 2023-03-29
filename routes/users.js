import express from "express";
import {
  getUser,
  toggleFavourite,
  updateInfo,
  searchUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:id", getUser);
router.post("/delete-user", deleteUser);
router.get("/search-user", searchUser);
router.post("/toggle-favourite", toggleFavourite);
router.put("/update-info/:id", updateInfo);

export default router;

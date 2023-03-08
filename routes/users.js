import express from "express";
import {
  update,
  deleteUser,
  getUser,
  addTocart,
  updateToCart,
  deleteToCart,
  searchUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//add product to cart
router.put("/add-to-cart", addTocart);
//update product to cart
router.put("/update-to-cart", updateToCart);
//delete product to cart
router.put("/delete-to-cart", deleteToCart);
// Search User
router.get("/search", searchUser);
//update user
router.put("/:id", verifyToken, update);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subcribe a user

export default router;

const express = require("express");

const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} = require("../controllers/shopControllers/sh_cartCtrl");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
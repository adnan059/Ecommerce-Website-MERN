const express = require("express");
const { verifyToken } = require("../utils/verify");
const {
  addReview,
  getReviews,
} = require("../controllers/shopControllers/sh_reviewCtrl");

const router = express.Router();

router.post("/add", verifyToken, addReview);

router.get("/:productId", getReviews);

module.exports = router;

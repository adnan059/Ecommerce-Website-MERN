const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
} = require("../controllers/shopControllers/sh_productCtrl");

const router = express.Router();

router.get("/products", getFilteredProducts);
router.get("/products/:id", getProductDetails);

module.exports = router;

const express = require("express");
const {
  getFilteredProducts,
} = require("../controllers/shopControllers/sh_productCtrl");

const router = express.Router();

router.get("/products", getFilteredProducts);

module.exports = router;

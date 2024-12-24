const express = require("express");
const { verifyToken } = require("../utils/verify");
const {
  createOrder,
  capturePayment,
} = require("../controllers/shopControllers/sh_orderCtrl");

const router = express.Router();

router.post("/create", verifyToken, createOrder);

router.post("/capture", verifyToken, capturePayment);

module.exports = router;

const express = require("express");
const { verifyToken } = require("../utils/verify");
const { createOrder } = require("../controllers/shopControllers/sh_orderCtrl");

const router = express.Router();

router.post("/create", verifyToken, createOrder);

module.exports = router;

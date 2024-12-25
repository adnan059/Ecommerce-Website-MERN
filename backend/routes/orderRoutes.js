const express = require("express");
const { verifyToken, verifyUser } = require("../utils/verify");
const {
  createOrder,
  capturePayment,
  getOrdersByUser,
  getOrderDetails,
} = require("../controllers/shopControllers/sh_orderCtrl");

const router = express.Router();

router.post("/create", verifyToken, createOrder);

router.post("/capture", verifyToken, capturePayment);

router.get("/list/:userId", verifyToken, verifyUser, getOrdersByUser);

router.get("/details/:id", verifyToken, getOrderDetails);

module.exports = router;

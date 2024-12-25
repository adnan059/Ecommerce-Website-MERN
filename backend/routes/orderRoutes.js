const express = require("express");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");
const {
  createOrder,
  capturePayment,
  getOrdersByUser,
  getOrderDetails,
} = require("../controllers/shopControllers/sh_orderCtrl");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminControllers/orderCtrl");

const router = express.Router();

router.post("/create", verifyToken, createOrder);

router.post("/capture", verifyToken, capturePayment);

router.get("/list/:userId", verifyToken, verifyUser, getOrdersByUser);

router.get("/details/:id", verifyToken, getOrderDetails);

router.get("/all", verifyToken, verifyAdmin, getAllOrders);

router.put("/update/:id", verifyToken, verifyAdmin, updateOrderStatus);

module.exports = router;

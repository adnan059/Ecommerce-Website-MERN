const express = require("express");
const { verifyToken } = require("../utils/verify");
const {
  addAddress,
  fetchAllAddress,
  deleteAddress,
  updateAddress,
} = require("../controllers/shopControllers/sh_addressCtrl");

const router = express.Router();

// create new address
router.post("/add", verifyToken, addAddress);

// fetch all addresses of an user
router.get("/get/:userId", verifyToken, fetchAllAddress);

// update an address
router.put("/update/:userId/:addressId", verifyToken, updateAddress);

// delete an address
router.delete("/delete/:userId/:addressId", verifyToken, deleteAddress);

module.exports = router;

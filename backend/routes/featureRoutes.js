const express = require("express");
const { verifyToken, verifyAdmin } = require("../utils/verify");
const {
  addFeatureImage,
  getFeatureImages,
} = require("../controllers/adminControllers/featureCtrl");

const router = express.Router();

router.post("/add", verifyToken, verifyAdmin, addFeatureImage);

router.get("/get", verifyToken, getFeatureImages);

module.exports = router;

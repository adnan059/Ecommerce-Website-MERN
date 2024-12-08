const express = require("express");
const { upload } = require("../utils/helpers");
const {
  imageUploadCtrl,
} = require("../controllers/adminControllers/productCtrl");
const { verifyToken, verifyAdmin } = require("../utils/verify");

const router = express.Router();

router.post(
  "/upload-image",
  verifyToken,
  verifyAdmin,
  upload.single("my-file"),
  imageUploadCtrl
);

module.exports = router;

const express = require("express");
const { upload } = require("../utils/helpers");
const {
  imageUploadCtrl,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../controllers/adminControllers/productCtrl");
const { verifyToken, verifyAdmin } = require("../utils/verify");

const router = express.Router();

// image upload
router.post(
  "/upload-image",
  verifyToken,
  verifyAdmin,
  upload.single("my-file"),
  imageUploadCtrl
);

router.post("/add", verifyToken, verifyAdmin, addProduct);

router.put("/edit/:id", verifyToken, verifyAdmin, editProduct);

router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);

router.get("/all", fetchAllProducts);

module.exports = router;

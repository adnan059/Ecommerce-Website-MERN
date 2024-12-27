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
const {
  searchProducts,
} = require("../controllers/shopControllers/sh_searchCtrl");

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

router.get("/search/:keyword", searchProducts);

module.exports = router;

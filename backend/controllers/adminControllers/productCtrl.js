const Product = require("../../models/Product");
const { imageUploadUtil } = require("../../utils/helpers");

// upload product image
const imageUploadCtrl = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.status(200).json({ succes: true, result });
  } catch (error) {
    next(error);
  }
};

// add a product
const addProduct = async (req, res, next) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newProduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// fetch all products
const fetchAllProducts = async (req, res, next) => {
  try {
    const productList = await Product.find({});
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};

// edit a product
const editProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// delete a product
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  imageUploadCtrl,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};

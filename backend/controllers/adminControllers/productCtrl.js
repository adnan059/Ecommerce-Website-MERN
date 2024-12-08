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
const addProduct = async (req, res, next) => {};

// fetch all products

module.exports = {
  imageUploadCtrl,
  addProduct,
};

const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "diwpwlzg5",
  api_key: "764592342164522",
  api_secret: "7a3AFe9fxj1dl-pRf02z6MWO8PE",
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

const upload = multer({ storage });

module.exports = {
  upload,
  imageUploadUtil,
};
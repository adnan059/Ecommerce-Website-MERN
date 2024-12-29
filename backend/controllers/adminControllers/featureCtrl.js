const Feature = require("../../models/Feature");

// adding new image
const addFeatureImage = async (req, res, next) => {
  try {
    const { image } = req.body;
    const newFeatureImage = new Feature({ image });

    await newFeatureImage.save();

    res.status(201).json(newFeatureImage);
  } catch (error) {
    next(error);
  }
};

// getting alll the images
const getFeatureImages = async (req, res, next) => {
  try {
    const images = await Feature.find({});
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFeatureImage,
  getFeatureImages,
};

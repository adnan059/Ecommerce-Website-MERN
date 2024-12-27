const Product = require("../../models/Product");
const createError = require("../../utils/createError");

const searchProducts = async (req, res, next) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return next(createError(400, "keyword is required in string format"));
    }

    const regEx = new RegExp(keyword, "i");

    const searchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(searchQuery);

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchProducts,
};

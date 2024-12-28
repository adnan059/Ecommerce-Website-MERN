const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Review = require("../../models/Review");
const createError = require("../../utils/createError");

// add a new review
const addReview = async (req, res, next) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({ userId });

    if (!order) {
      return next(
        createError(403, "you need to purchase product to review it")
      );
    }

    const hasAlreadyReviewed = await Review.findOne({
      productId,
      userId,
    });

    if (hasAlreadyReviewed) {
      return next(createError(400, "you've already reviewed this product!"));
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });

    const totalReviews = reviews.length;

    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

// get all reviews for a specific product
const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getReviews,
};

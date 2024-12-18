const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const createError = require("../../utils/createError");

// create new cart or add more quantities to an existing cart
const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return next(createError(400, "invalid data provided"));
    }

    const product = await Product.findById(productId);

    if (!product) {
      return next(createError(404, "product not found"));
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (currentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[currentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// fetch cart items
const fetchCartItems = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(createError(400, "user id is required"));
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return next(createError(404, "cart not found"));
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (cart.items.length > validItems.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({ ...cart._doc, items: populateCartItems });
  } catch (error) {
    next(error);
  }
};

// update cart items quantity
const updateCartItemQty = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return next(createError(400, "invalid data provided"));
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(createError(404, "cart not found"));
    }

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (currentProductIndex === -1) {
      return next(createError(404, "cart item not present"));
    }

    cart.items[currentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res
      .status(200)
      .json({ ...cart._doc, items: populateCartItems, success: true });
  } catch (error) {
    next(error);
  }
};

// delete cart item
const deleteCartItem = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return next(createError(400, "invalid data provided"));
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return next(createError(404, "cart not found"));
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId.toString()
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      quantity: item.quantity,
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
    }));

    res
      .status(200)
      .json({ ...cart._doc, items: populateCartItems, success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};

const Order = require("../../models/Order");
const createError = require("../../utils/createError");
const { paypal } = require("../../utils/helpers");

// create an order
const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: process.env.PAYPAL_RETURN_URL,
        cancel_url: process.env.PAYPAL_CANCEL_URL,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return next(
          createError(
            500,
            error?.message || "error while creating paypal payment"
          )
        );
      } else {
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder._id,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// capture a payment
const capturePayment = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  capturePayment,
};

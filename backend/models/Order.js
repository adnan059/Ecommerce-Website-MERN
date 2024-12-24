const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    cartId: String,
    cartItems: [
      {
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity: Number,
      },
    ],
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

// paypal business email: sb-a9shx29731964@business.example.com

// paypal business email pswd: QYa=c8:n

// personal email: sb-fea5i29731969@personal.example.com

// personal email pswd: Rj#fYD?6

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// -----------------------------------

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const featureRoutes = require("./routes/featureRoutes");

// -----------------------------------

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

// -----------------------------------

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("database connection successful");
    app.listen(PORT, () => console.log(`server listening to port ${PORT}`));
  } catch (error) {
    throw new Error(error?.message || "database connection failed");
  }
};

connectDB();

// -----------------------------------
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// -----------------------------------

app.get("/test", (req, res) => {
  res.send("working fine");
});

// -----------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/feature", featureRoutes);

// -----------------------------------

app.use((err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "something went wrong";
  const stack = err?.stack;
  return res.status(status).json({
    stack,
    status,
    message,
    success: false,
  });
});

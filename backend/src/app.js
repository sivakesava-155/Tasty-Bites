const express = require("express");
const app = express();

const userRoutes = require("./users/user.routes");
const authRoutes = require("./auth/auth.routes");
const productRouter = require("./product/prod.routes");
const orderRoutes = require("./orders/order.routes");
const authMiddleware = require("./middlewares/auth.middleware");
// app.use("/uploads", require("express").static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(cors({
  origin: "*", // your React app
  credentials: true
}));
// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRoutes);

module.exports = app;
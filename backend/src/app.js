const express = require("express");
const app = express();

const userRoutes = require("./users/user.routes");
const authRoutes = require("./auth/auth.routes");

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

module.exports = app;
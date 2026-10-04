require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
const PORT = 5000;

let dbError = null;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SmartDine API 🚀",
    status: "success"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    hasUri: !!process.env.MONGODB_URI,
    dbState: mongoose.connection.readyState,
    dbError: dbError,
  });
});

app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    dbError = err.message;
    console.error("MONGODB CONNECTION ERROR:", err.message);
  });

app.listen(PORT, () => {
  console.log("Server is running...");
});
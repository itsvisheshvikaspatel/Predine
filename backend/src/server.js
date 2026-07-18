const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
const PORT = 5000;
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SmartDine API 🚀",
    status: "success"
  });
});
app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌", err);
  });
app.listen(PORT, () => {
  console.log("Server is running...");
});
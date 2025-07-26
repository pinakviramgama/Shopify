const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("MongoDB connected..!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const authRouter = require("./APIs/auth/auth-routes");
const productRoutes = require("./APIs/products/product-routes");

app.use("/api/auth", authRouter);
app.use("/api/admin", productRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

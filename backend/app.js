const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routers/user");
const sauceRoutes = require("./routers/sauces");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error();
  });

// Bodyparser and makes req.body available
app.use(express.json());

// Applies to all requests
// setHeader() - a set of 3 access control headers to set orgin/headers/methods
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // To present CORS errors
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  // Handle preflight requests immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Registers routers for all requests to the endpoints
app.use("/images", express.static(path.join(__dirname, "images"))); // for multer
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
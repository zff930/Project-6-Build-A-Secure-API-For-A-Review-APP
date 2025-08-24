const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require('./routers/user');
const sauceRoutes = require('./routers/sauces');

const app = express();

mongoose
  .connect(
    "mongodb+srv://zwz108:XGxZUEiBjxq3fzXT@cluster0.be5yt1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error();
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
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

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// // Test code to verify authentication middleware works before adding any sauce to the project.
// const auth = require("./middleware/auth");
// app.get("/test-auth", auth, (req, res) => {
//   res.status(200).json({
//     message: "Auth middleware passed!",
//   });
// });

module.exports = app;
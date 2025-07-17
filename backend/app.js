// MonggoDB password: XGxZUEiBjxq3fzXT
// MongoDB connection string: mongodb+srv://zwz108:<db_password>@cluster0.be5yt1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const mongoose = require("mongoose");

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

// app.use((req, res, next) => {
//   res.json({ message: "Your request was successful!" });
// });

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // Handle preflight requests immediately
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.post("/api/auth/signup", (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'User created successfully!'
    });
    next();
});

app.post("/api/auth/login", (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'User logged in successfully!'
    });
    // next();
});



module.exports = app;

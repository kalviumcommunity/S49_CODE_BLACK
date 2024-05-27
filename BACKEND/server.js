// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI;
const UserModel = require("./Models/Coders");

async function Connection() {
  await mongoose.connect(mongoDbUri);
  console.log("Connected to DB");
}

app.use(express.json());
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.json({ "message" : "pong" });
});

app.post("/api/addEntity", async (req, res) => {
  try {
    const { name } = req.body;
    const newEntity = new UserModel({ name });
    await newEntity.save();

    res.json({ success : true, message : "An Entity Added Successfully." });
  } catch (error) {
    console.error("Error Adding an Entity :", error);
    res.status(500).json({ success : false, message : "Failed To Add an Entity." });
  }
});

async function GetAll() {
  let result = await UserModel.find();
  return result;
}

app.get("/getCoders", async (req, res) => {
  let value = await GetAll();
  res.send({ data : value });
});

Connection().then(() => {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
});

module.exports = app;
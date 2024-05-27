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

const { UserModel, addEntitySchema, updateEntitySchema } = require("./Models/Coders");


const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI;

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
    const { error } = addEntitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const name = req.body;
    const newEntity = new UserModel(name);
    let x = await newEntity.save();

    res.json({ success: true, message: "An Entity Added Successfully.", x });
  } catch (error) {
    console.error("Error in Adding an Entity :", error);
    res.status(500).json({ success : false, message : "Failed To Add an Entity." });
  }
});


app.put("/api/updateEntity/:id", async (req, res) => {
  try {
    const entityId = req.params.id;
  

    const { error } = updateEntitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const name = req.body;
    await UserModel.findByIdAndUpdate(entityId,  name );

    res.json({ success: true, message: "An Entity Updated Successfully." });
  } catch (error) {
    console.error("Error in Updating an Entity:", error);
    res.status(500).json({ success: false, message: "Failed to Update an Entity." });
  }
});

app.delete("/api/deleteEntity/:id", async (req, res) => {
  try {
    const entityId = req.params.id;

    await UserModel.findByIdAndDelete(entityId);

    res.json({ success: true, message: "An Entity Deleted Successfully" });
  } catch (error) {
    console.error("Error in Deleting an Entity:", error);
    res.status(500).json({ success: false, message: "Failed to Delete an Entity" });
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
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

const cookieParser = require("cookie-parser");

const {
  UserModel,
  signupSchema,
  addEntitySchema,
  updateEntitySchema,
  LoginModel,
  addLogin,
} = require("./Models/Coders");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(cookieParser());

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

app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const { error } = signupSchema.validate({ username, password, email });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const existingUser = await LoginModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    const newUser = new LoginModel({ username, password, emailAddress: email });
    await newUser.save();
    res.cookie("username", username);

    res.json({
      success: true,
      message: "Signup Successful",
      username,
    });
    console.log("Signup Success",req.cookies.username);
  } catch (error) {
    console.error("Error during Signup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password, email } = req.body;

  const { error } = addLogin.validate({ username, password, email });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const user = await LoginModel.findOne({ username });
    await user.save();

    if (user) {
      res.cookie("username", username);

      res.json({
        success: true,
        message: "Login Successful",
        username,
      });
      console.log("Login Success",username);

    } else {
      res.status(200).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error during Login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ success: true, message: "Logout Successful" });
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
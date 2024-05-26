const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  names: String,
  // founder: String,
  // yearOfEstablishment: Number,
  // difficultylevel: String,
  // description: String,
  // onlinecompilerlink: String,
});

const UserModel = mongoose.model("visit", UserSchema);
module.exports = UserModel;

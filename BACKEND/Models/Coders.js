const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  names: String,
  founder: String,
  yearOfEstablishment: Number,
  difficultylevel: String,
  description: String,
  onlinecompilerlink: String,
  rating: String,
  review: String,
  image: String,

});

const UserModel = mongoose.model("place", UserSchema);

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String,
  emailAddress: String,
});

const LoginModel = mongoose.model("user", LoginSchema);



const addEntitySchema = Joi.object({
  names: Joi.string().required(),
  founder: Joi.string().required(),
  yearOfEstablishment: Joi.string().required(),
  difficultylevel: Joi.string().required(),
  description: Joi.string().required(),
  onlinecompilerlink: Joi.string().required(),
  rating: Joi.string().required(),
  review: Joi.string().required(),
  image: Joi.string().uri().required(),
});

const updateEntitySchema = Joi.object({
  names: Joi.string(),
  founder: Joi.string(),
  yearOfEstablishment: Joi.string(),
  difficultylevel: Joi.string(),
  description: Joi.string(),
  onlinecompilerlink: Joi.string(),
  rating: Joi.string(),
  review: Joi.string(),
  image: Joi.string().uri(),
});

const addLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { UserModel, LoginModel, addEntitySchema, updateEntitySchema, addLogin, signupSchema };


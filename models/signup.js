const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bycrept = require("bcrypt");

const SignupSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    validate: [isEmail, " Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  userType: {
    type: String,
  },
  avatar: String,
  createdAt: Date,
  phone: {
    type: String,
    default: "",
  },
  wallet: {
    type: Number,
    required: true,
  },
});

// Hashing Password Before Save
SignupSchema.pre("save", async function (next) {
  //Generate a salt
  const salt = await bycrept.genSalt();
  //Hash The Password
  this.password = await bycrept.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("users", SignupSchema);

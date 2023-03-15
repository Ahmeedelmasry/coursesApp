const SignUp = require("../models/signup");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const path = require("path");
// const fs = require("fs");

//Handle Errors
const handleErrs = (err) => {
  let error = {
    userName: "",
    userType: "",
    email: "",
    password: "",
    phone: "",
  };
  if (err.code === 11000) {
    error.email = "This email already exists, try another email";
  } else {
    if (err.errors) {
      Object.values(err.errors).forEach((err) => {
        error[err.path] = err.message;
      });
    }
  }
  console.log(err.errors);
  return error;
};

const maxAge = 60 * 60 * 24 * 1;

//Generating Token
const generToken = (id) => {
  return jwt.sign({ id }, "my old love is married now", {
    expiresIn: maxAge,
  });
};

const methodSetCookie = (req, res) => {
  const token = generToken(req.params.id);
  res.cookie("jwt", token, {
    maxAge: maxAge * 1000,
    httpOnly: false,
    sameSite: "https://ahmedelmasry1994.web.app",
    secure: true,
  });
  res.status(201).json({ message: `Welcome back ${req.params.userName}` });
};

const postSignup = async (req, res) => {
  try {
    let newUser = await SignUp.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      avatar: "",
      createdAt: Date.now(),
      wallet: 0,
    });
    let sendUser = {
      _id: newUser._id,
    };
    const token = generToken(sendUser._id);
    const cookieData = {
      token: token,
      newUser: sendUser,
    };
    res.cookie("coursesApp", JSON.stringify(cookieData), {
      maxAge: maxAge * 1000,
      httpOnly: false,
      sameSite: "https://ahmedelmasry1994.web.app",
      secure: true,
    });
    res.json(newUser);
  } catch (error) {
    console.log(error);
    const errRes = handleErrs(error);
    console.log("Error");
    res.status(401).json({ errors: errRes });
  }
};

module.exports = {
  postSignup,
  methodSetCookie,
};

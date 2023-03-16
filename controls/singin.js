const SignUp = require("../models/signup");
const jwt = require("jsonwebtoken");
const bycrept = require("bcrypt");
const { isEmail } = require("validator");
const configSchema = require("../models/configrations");
const wishlistSchema = require("../models/wishlist");

const maxAge = 60 * 60 * 24 * 1;
//Generating Token
const generToken = (id) => {
  return jwt.sign({ id }, "my old love is married now", {
    expiresIn: maxAge,
  });
};

const doLogin = async (req, res) => {
  let errors = {
    errors: {},
  };
  if (!req.body.email) {
    errors.errors.email = "Please enter your email";
  } else {
    if (!isEmail(req.body.email)) {
      errors.errors.email = "Please enter a valid email";
    }
  }

  if (!req.body.password) {
    errors.errors.password = "Please enter your password";
  }

  if (errors.errors.email || errors.errors.password) {
    res.status(401).json(errors);
  } else {
    try {
      const getUser = await SignUp.findOne({
        email: req.body.email,
      });
      if (getUser) {
        const comparePass = await bycrept.compare(
          req.body.password,
          getUser.password
        );
        if (comparePass) {
          let sendUser = {
            _id: getUser._id,
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
            secure: false,
          });
          console.log("Login Success");
          res.json("Login successfuly");
        } else {
          res.status(404).json({ errors: { user: "incorrect password" } });
        }
      } else {
        res.status(404).json({ errors: { user: "User not found" } });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getOneUser = async (req, res) => {
  try {
    let user = await SignUp.findOne({ _id: req.params.userId });
    user.password = "";
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: true });
  }
};

const updateWallet = async (req, res) => {
  try {
    //vars
    const bodyData = req.body;
    if (req.params.calcType == "minus") {
      const buyer = await SignUp.findOne({ _id: bodyData.buyerId });
      await SignUp.updateOne(
        { _id: bodyData.buyerId },
        {
          wallet: buyer.wallet - bodyData.paymentAmount,
        }
      );
      const checkWishlistitem = await wishlistSchema.findOne({
        loggerId: bodyData.buyerId,
        courseId: bodyData.courseId,
      });
      if (checkWishlistitem) {
        await wishlistSchema.deleteOne({
          loggerId: bodyData.buyerId,
          courseId: bodyData.courseId,
        });
      }
    } else {
      const instructor = await SignUp.findOne({ _id: bodyData.instructorId });
      //Get Config percentage
      const getPercentage = await configSchema.find();
      const percentage = getPercentage[0].percentage;
      await SignUp.updateOne(
        { _id: bodyData.instructorId },
        {
          wallet:
            instructor.wallet +
            (bodyData.paymentAmount -
              bodyData.paymentAmount * `.${percentage}`),
        }
      );
    }
    res.status(200).json({ update: true });
  } catch (error) {
    console.log(error);
    res.status(505).json({ error: true });
  }
};

const logOut = (req, res) => {
  res.cookie("coursesApp", "", {
    maxAge: 1,
    sameSite: "https://ahmedelmasry1994.web.app",
    // sameSite: "none",
    httpOnly: false,
    secure: false,
  });
  res.json("Signed out");
};

module.exports = { doLogin, logOut, updateWallet, getOneUser };

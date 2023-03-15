const express = require("express");
const router = express.Router();

const { postSignup } = require("../controls/signUp");

router.post("/", postSignup);

module.exports = router;

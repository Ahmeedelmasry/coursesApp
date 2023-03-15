const express = require("express");
const router = express.Router();

const {
  doLogin,
  logOut,
  updateWallet,
  getOneUser,
} = require("../controls/singin");

router.post("/", doLogin);
router.get("/get-user/:userId", getOneUser);
router.post("/update-wallet/:calcType", updateWallet);
router.get("/logout", logOut);

module.exports = router;

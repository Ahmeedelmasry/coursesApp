const express = require("express");
const router = express();
const { updateFinance } = require("../controls/finance.js");

router.post("/", updateFinance);

module.exports = router;

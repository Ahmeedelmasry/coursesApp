const express = require("express");
const router = express();
const { placeOrder } = require("../controls/orders");

router.post("/", placeOrder);

module.exports = router;

const express = require("express");
const router = express();
const { addToWishlist, getWishlist } = require("../controls/wishlist");

router.post("/add", addToWishlist);
router.get("/get/:userId", getWishlist);

module.exports = router;

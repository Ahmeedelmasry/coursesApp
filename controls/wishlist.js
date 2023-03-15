const wishlistSchema = require("../models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const checkWishlistitem = await wishlistSchema.findOne({
      loggerId: req.body.loggerId,
    });
    if (checkWishlistitem) {
      await wishlistSchema.deleteOne({
        loggerId: req.body.loggerId,
      });
      res.json({ message: "Course was removed from your wishlist" });
    } else {
      const createWishlist = await wishlistSchema.create(req.body);
      const result = await createWishlist.save();
      res.status(200).json({ message: "Course was added to your wishlist" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getWishlist = async (req, res) => {
  try {
    const getWishlist = await wishlistSchema.find({
      loggerId: req.params.userId,
    });
    res.status(200).json(getWishlist);
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

module.exports = { addToWishlist, getWishlist };

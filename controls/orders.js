const orderSchema = require("../models/orders");

const placeOrder = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.placedAt = Date.now();
    const place_order = await orderSchema.create(reqBody);
    await place_order.save();
    res.status(200).json({ update: true });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

module.exports = { placeOrder };

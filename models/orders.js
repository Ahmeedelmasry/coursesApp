const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  buyerId: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  placedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);

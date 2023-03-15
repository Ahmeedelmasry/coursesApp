const mongoose = require("mongoose");
const financeSchema = mongoose.Schema({
  safeAmount: {
    type: Number,
    default: 0,
  },
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
  safePercentage: {
    type: Number,
    required: true,
  },
  placedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("finance", financeSchema);

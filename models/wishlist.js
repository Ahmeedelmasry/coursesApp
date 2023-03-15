const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lecturesNum: {
    type: Number,
    required: true,
  },
  lectures: {
    type: Array,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  requiredAgeFrom: {
    type: Number,
    required: true,
  },
  requiredAgeTo: {
    type: Number,
    required: true,
  },
  requirements: {
    type: Array,
    required: false,
  },
  requirementsNum: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  loggerId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("wishlist", wishlistSchema);

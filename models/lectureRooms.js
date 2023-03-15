const mongoose = require("mongoose");
const lectureSchema = mongoose.Schema({
  lectureNum: {
    type: Number,
    required: true,
  },
  lectureDate: {
    type: String,
    required: true,
  },
  lectureTime: {
    type: String,
    required: true,
  },
  lectureText: {
    type: String,
    required: true,
  },
  lectureId: {
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
  insertedAt: {
    type: Date,
    required: true,
  },
  isBought: {
    type: Boolean,
  },
});

module.exports = mongoose.model("lecturesRooms", lectureSchema);

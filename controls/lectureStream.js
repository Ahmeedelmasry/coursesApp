const LectureSchema = require("../models/lectureRooms");
const OrderSchema = require("../models/orders");

const getLectureForStream = async (req, res) => {
  try {
    const lecture = await LectureSchema.findOne({
      lectureId: req.body.lecId,
      instructorId: req.body.instId,
      courseId: req.body.courseId,
    });
    const checkIfBought = await OrderSchema.findOne({
      buyerId: req.body.userId,
      instructorId: req.body.instId,
      courseId: req.body.courseId,
    });
    if (checkIfBought) {
      lecture.isBought = true;
    } else {
      lecture.isBought = false;
    }
    res.status(200).json(lecture);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

const startStStream = async (req, res) => {
  res.json("done");
};

module.exports = { getLectureForStream, startStStream };

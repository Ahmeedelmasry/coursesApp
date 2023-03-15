const orderSchema = require("../models/orders");
const CourseSchema = require("../models/courseData");

const getLearning = async (req, res) => {
  try {
    let learningsToSend = [];
    const learnings = await orderSchema.find({ buyerId: req.params.userId });
    if (learnings.length) {
      for (let i = 0; i < learnings.length; i++) {
        let singleCourse = await CourseSchema.findById(learnings[i].courseId);
        learningsToSend.push(singleCourse);
      }
    }
    res.json(learningsToSend);
  } catch (error) {
    console.log(error);
    res.json({ error: true });
  }
};

module.exports = { getLearning };

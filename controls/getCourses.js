const CourseSchema = require("../models/courseData");
const orderSchema = require("../models/orders");

const getCourses = async (req, res) => {
  try {
    const result = await CourseSchema.find({ category: req.params.category });
    let resultCopy = [...result];
    for (let i = 0; i < resultCopy.length; i++) {
      resultCopy[i].isBought = false;
      const findBoughtCourses = await orderSchema.findOne({
        buyerId: req.params.userId,
        courseId: resultCopy[i]._id,
      });
      if (findBoughtCourses) {
        resultCopy[i].isBought = true;
      }
    }
    res.json(resultCopy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
const getSingleCourse = async (req, res) => {
  const result = await CourseSchema.findOne({ _id: req.params.courseId });
  result.isBought = false;
  const findBoughtCourses = await orderSchema.findOne({
    buyerId: req.params.userId,
    courseId: result._id,
  });
  if (findBoughtCourses) {
    result.isBought = true;
  }
  res.json(result);
};

module.exports = { getCourses, getSingleCourse };

const express = require("express");

const router = express();
const { getCourses, getSingleCourse } = require("../controls/getCourses");
const { getLearning } = require("../controls/learning");

//Get Courses by Category
router.get("/:category/:userId", getCourses);

//Get Course Details
router.get("/course/get/:courseId/:userId", getSingleCourse);

//Get Learnings
router.get("/learning/get_learning/:userId", getLearning);

module.exports = router;

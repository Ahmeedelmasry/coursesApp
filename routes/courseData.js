const express = require("express");
const fileUpload = require("express-fileupload");

const router = express();
const { postCourse } = require("../controls/courseData");

router.post("/", fileUpload({ createParentPath: true }), postCourse);

module.exports = router;

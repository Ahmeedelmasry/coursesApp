const CourseSchema = require("../models/courseData");
const lectureSchema = require("../models/lectureRooms");
const path = require("path");
const mongoose = require("mongoose");

const postCourse = async (req, res) => {
  const imgFile = req.files.image;
  const ext = imgFile.mimetype.split("").splice(6).join("");
  const editedImgTitle = req.body.title
    .split(" ")
    .map((el) => (el == " " ? (el = "-") : el))
    .join("-");
  const imgFullName = `${editedImgTitle}.${ext}`;
  const filePath = path.join(__dirname, "../courseImgs", imgFullName);

  imgFile.mv(filePath, (err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Upload File Error" });
  });
  try {
    req.body.image = imgFullName;
    const courseLectures = JSON.parse(req.body.lectures);
    courseLectures.forEach((lec) => {
      lec._id = mongoose.Types.ObjectId();
    });
    req.body.lectures = courseLectures;
    req.body.requirements = JSON.parse(req.body.requirements);
    const newCourse = await CourseSchema.create(req.body);
    const afterSaveCourse = await newCourse.save();
    for (let i = 0; i < courseLectures.length; i++) {
      let singleLec = courseLectures[i];
      const lecToSave = {
        lectureId: singleLec._id,
        lectureText: singleLec.text,
        lectureDate: singleLec.date,
        lectureTime: singleLec.time,
        lectureNum: parseInt(singleLec.lictureNum),
        insertedAt: new Date(),
        instructorId: req.body.instructorId,
        courseId: afterSaveCourse._id,
      };
      const saveLec = await lectureSchema.create(lecToSave);
      await saveLec.save();
    }
    res.json("done");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        serverError: true,
      },
    });
  }
};

module.exports = { postCourse };

const express = require("express");
const router = express();

const {
  getLectureForStream,
  startStStream,
} = require("../controls/lectureStream");

router.post("/find-lecture", getLectureForStream);

router.get("/lec-stream/:lectureId", startStStream);

module.exports = router;

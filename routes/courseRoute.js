const express = require("express");
const { getDb } = require("../db");
const router = express.Router();

const {
  getCourses,
  getCourseContents,
  getCourseCollection,
  addCourseCollection,
  addCoursesToCollection,
  removeCourseFromCollection,
  deleteCourseCollection,
} = require("../controllers/courseController");

router.get("/", getCourses);

router.get("/contents/:id", getCourseContents);

router.get("/collections", getCourseCollection);

router.post("/collections", addCourseCollection);;

router.post("/collections/:slug", addCoursesToCollection);

router.delete("/collections/:slug/remove-course", removeCourseFromCollection);

router.delete("/collections/:slug", deleteCourseCollection);

module.exports = router;

const express = require("express");
const { getDb } = require("../db");
const router = express.Router();

const {getCourses, getCourseContents} = require("../controllers/courseController");

router.get("/", getCourses);

router.get("/contents/:id", getCourseContents);

module.exports = router;

const mongoose = require("mongoose");
const Course = require("./course");

const courseCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  numOrder: {
    type: Number,
    required: true,
  },
  courses: [
    {
      type: {},
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("CourseCollection", courseCollectionSchema);

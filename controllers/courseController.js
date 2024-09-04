const Course = require("../models/course");
const CourseContent = require("../models/course-content");
const CourseCollection = require("../models/course-collection");

const getCourses = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to get courses'  */
  try {
    const { category, coursetype, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = {
      ...(category && { categoryid: parseInt(category) }),
      ...(coursetype && { "coursetype.id": coursetype }),
      ...(search && { fullname: { $regex: search, $options: "i" } }),
    };

    const result = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalData = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalData / limit);

    res.status(200).json({
      data: result,
      meta: {
        page,
        totalPages,
        totalData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseContents = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to get course contents'  */
  try {
    const { id } = req.params;

    const result = await CourseContent.find({ courseId: parseInt(id) }).exec();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addCourseCollection = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to add new collection'  */
  try {
    /* #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Collection data',
          required: true,
          type: 'object',
          schema: { $ref: "#/definitions/AddCollection" }
    } */
    const { name, slug, numOrder } = req.body;

    const courseCollection = new CourseCollection({
      name,
      slug,
      numOrder,
    });

    await courseCollection.save();
    res.status(201).json({
      message: "Course collection created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addCoursesToCollection = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to add courses to a collection'  */
  try {
    /* #swagger.parameters['obj'] = {
          in: 'body',
          description: 'course ids',
          required: true,
          type: 'object',
          schema: { $ref: "#/definitions/AddCoursesToCollection" }
    } */
    const { coursesId } = req.body;
    const slug = req.params.slug;

    const courseCollection = await CourseCollection.find({ slug });

    if (!courseCollection) {
      return res.status(404).json({ message: "Course collection not found" });
    }

    const courses = await Course.find({ id: { $in: coursesId } });
    await CourseCollection.updateOne(
      { slug },
      { $push: { courses: { $each: courses } } }
    );

    res.status(200).json({
      message: "Courses added to collection",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCourseCollection = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to delete course collection'  */
  try {
    const slug = req.params.slug;
    await CourseCollection.deleteOne({ slug });
    res.status(200).json({
      message: "Course collection deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeCourseFromCollection = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to remove course from a collection'  */
  try {
    /* #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Course id',
          required: true,
          type: 'object',
          schema: { $ref: "#/definitions/RemoveCourseFromCollection" }
    } */
    const { courseId } = req.body;
    const slug = req.params.slug;

    const courseCollection = await CourseCollection.findOne({ slug });

    if (!courseCollection) {
      return res.status(404).json({ message: "Course collection not found" });
    }

    await CourseCollection.updateOne(
      { slug },
      { $pull: { courses: { id: parseInt(courseId) } } }
    );

    res.status(200).json({
      message: "Course removed from collection",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseCollection = async (req, res) => {
  /*  #swagger.tags = ['Course']
      #swagger.description = 'Endpoint to get course collection'  */
  try {
    const result = await CourseCollection.find().exec();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCourses,
  getCourseContents,
  getCourseCollection,
  addCourseCollection,
  addCoursesToCollection,
  removeCourseFromCollection,
  deleteCourseCollection,
};

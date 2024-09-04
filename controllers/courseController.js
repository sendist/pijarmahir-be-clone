const { getDb } = require("../db");

const getCourses = async (req, res) => {
  try {
    const db = getDb();
    const col = db.collection("courses");

    const { category, coursetype, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = {
      ...(category && { categoryid: parseInt(category) }),
      ...(coursetype && { "coursetype.id": coursetype }),
      ...(search && { fullname: { $regex: search, $options: "i" } }),
    };

    const result = await col
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalData = await col.countDocuments(query);
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
  try {
    const db = getDb();
    const col = db.collection("course-contents");
    const { id } = req.params;

    const result = await col.find({ courseId: parseInt(id) }).toArray();

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
};
const { getDb } = require("../db");

const getReviews = async (req, res) => {
  try {
    const db = getDb();
    const col = db.collection("reviews");
    const { id } = req.params;

    const query = {
      ...(id && { courseId: parseInt(id) }),
    };

    const result = await col.find(query).toArray();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getReviews,
};

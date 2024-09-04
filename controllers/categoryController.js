const { getDb } = require("../db");

const getAllCategory = async (req, res) => {
  try {
    const db = getDb();
    const col = db.collection("categories");

    const result = await col.find().toArray();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCategory,
};

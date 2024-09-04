const Category = require("../models/category");

const getAllCategory = async (req, res) => {
  /*  #swagger.tags = ['Category']
      #swagger.description = 'Endpoint to get all category '  */
  try {
    const result = await Category.find().exec();

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

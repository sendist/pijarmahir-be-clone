const Review = require("../models/review");
const Testimoni = require("../models/testimoni");

const getReviews = async (req, res) => {
  /*  #swagger.tags = ['Review']
      #swagger.description = 'Endpoint to get user course reviews'  */
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = {
      ...(id && { courseId: parseInt(id) }),
    };

    const result = await Review.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalData = await Review.countDocuments(query);
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

const getTestimoni = async (req, res) => {
  /*  #swagger.tags = ['Review']
      #swagger.description = 'Endpoint to get all user testimoni'  */
  try {
    const result = await Testimoni.find().exec();

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
  getTestimoni,
};

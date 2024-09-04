const Partner = require("../models/partner");

const getAllPartners = async (req, res) => {
  /*  #swagger.tags = ['Partner']
    #swagger.description = 'Endpoint to get all course partners'  */
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await Partner.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalData = await Partner.countDocuments();
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

module.exports = {
  getAllPartners,
};

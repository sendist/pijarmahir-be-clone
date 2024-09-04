const express = require("express");
const { getReviews } = require("../controllers/reviewController");
const router = express.Router();

router.get("/:id?", getReviews);

module.exports = router;

const express = require("express");
const { getReviews, getTestimoni } = require("../controllers/reviewController");
const router = express.Router();

router.get("/testimoni", getTestimoni);

router.get("/:id?", getReviews);

module.exports = router;

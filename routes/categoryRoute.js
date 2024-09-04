const express = require("express");
const router = express.Router();

const { getAllCategory } = require("../controllers/categoryController");

router.get("/", getAllCategory);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getAllPartners } = require("../controllers/partnerController");

router.get("/", getAllPartners);

module.exports = router;

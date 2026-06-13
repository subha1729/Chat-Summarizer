const express = require("express");
const router = express.Router();

const {
  getStats,
} = require("../controllers/statsController");

const sessionAuth =
  require("../middleware/sessionAuth");

router.get("/", sessionAuth, getStats);

module.exports = router;
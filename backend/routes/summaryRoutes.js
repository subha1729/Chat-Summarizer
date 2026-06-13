const express = require("express");
const sessionAuth =
  require("../middleware/sessionAuth");

const {
  createSummary,
  getSummaries,
  createUserSummary,
  createTopicSummary,
  getSummaryById,
  deleteSummary
} = require("../controllers/summaryController");

const router = express.Router();

router.get(
  "/",
  sessionAuth,
  getSummaries
);

router.post(
  "/generate",
  sessionAuth,
  createSummary
);

router.post(
  "/user-summary",
  sessionAuth,
  createUserSummary
);

router.post(
  "/topic-summary",
  sessionAuth,
  createTopicSummary
);

router.get("/:id", 
  sessionAuth, 
  getSummaryById);

router.delete(
  "/:id",
  sessionAuth,
  deleteSummary
);

module.exports = router;
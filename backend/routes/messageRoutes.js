const express = require("express");
const router = express.Router();

const sessionAuth =
  require("../middleware/sessionAuth");

const {
  saveMessage,
  getMessages,
  getLatestMessages,
  getChannels
} = require(
  "../controllers/messageController"
);


router.post(
  "/",
  saveMessage
);

router.get(
  "/",
  sessionAuth,
  getMessages
);

router.get(
  "/latest",
  sessionAuth,
  getLatestMessages
);

router.get(
  "/channels",
  sessionAuth,
  getChannels
);

module.exports = router;
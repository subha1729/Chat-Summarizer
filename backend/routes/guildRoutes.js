const express =
  require("express");

const {
  getGuilds,
  getGuildDetails
} = require(
  "../controllers/guildController"
);

const router =
  express.Router();

const sessionAuth =
  require("../middleware/sessionAuth");

router.get(
  "/",
  sessionAuth,
  getGuilds
);

router.get(
  "/details",
  sessionAuth,
  getGuildDetails
);

module.exports =
  router;
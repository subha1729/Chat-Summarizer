const express =
  require("express");

const router =
  express.Router();

const {
  connectGuild,
  getUserGuildConnections
} = require(
  "../controllers/guildConnectionController"
);

const sessionAuth =
  require(
    "../middleware/sessionAuth"
  );

router.post(
  "/",
  sessionAuth,
  connectGuild
);

router.get(
  "/",
  sessionAuth,
  getUserGuildConnections
);

module.exports =
  router;
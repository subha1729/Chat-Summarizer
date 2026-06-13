const express =
  require("express");

const {
  getConnectedAccounts,
} =
  require("../controllers/accountController");

const router =
  express.Router();

router.get(
  "/",
  getConnectedAccounts
);

module.exports = router;
const ConnectedAccount =
  require("../models/ConnectedAccount");

const getConnectedAccounts =
  async (req, res) => {
    try {

      const accounts =
        await ConnectedAccount.find({
          userId: req.user._id
        });

      res.json(accounts);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch accounts"
      });
    }
  };

module.exports = {
  getConnectedAccounts
};
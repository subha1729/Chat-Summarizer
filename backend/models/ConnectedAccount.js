const mongoose = require("mongoose");

const connectedAccountSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      platform: {
        type: String,
        required: true,
      },

      platformUserId: {
        type: String,
        required: true,
      },

      username: String,

      accessToken: String,

      refreshToken: String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "ConnectedAccount",
    connectedAccountSchema
  );
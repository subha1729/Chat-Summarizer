const mongoose = require("mongoose");

const guildConnectionSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      guildId: {
        type: String,
        required: true
      },

      guildName: {
        type: String,
        required: true
      },

      discordId: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "GuildConnection",
    guildConnectionSchema
  );
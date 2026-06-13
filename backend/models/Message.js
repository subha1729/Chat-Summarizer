const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
  discordUser: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  channelId: {
    type: String,
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

  timestamp: {
    type: Date,
    default: Date.now
  },

  channelName: {
    type: String,
    required: true
  },

  ownerDiscordId: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
},
{
  timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);
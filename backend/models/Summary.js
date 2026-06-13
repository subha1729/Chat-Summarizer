const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
{
  guildId: {
    type: String,
    required: true
  },

  channelName: {
    type: String
  },

  content: {
    type: String,
    required: true
  },

  messageCount: {
    type: Number,
    default: 0
  },

  type: {
    type: String,
    default: "manual"
  },
  
  topics: [
    {
      name: String,
      summary: String
    }
   ],

   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
},

{
  timestamps: true
});

module.exports = mongoose.model("Summary", summarySchema);
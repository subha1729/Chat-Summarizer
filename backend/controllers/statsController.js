const Message = require("../models/Message");
const Summary = require("../models/Summary");

const getStats = async (req, res) => {
  try {
    const messages = await Message.countDocuments({userId: req.user._id});

    const summaries = await Summary.countDocuments({userId: req.user._id});

    const channels = await Message.distinct("channelName",{userId: req.user._id});

    res.json({
      messages,
      summaries,
      channels: channels.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
};
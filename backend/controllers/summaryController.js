const Message = require("../models/Message");
const Summary = require("../models/Summary");

const {
  generateSummary,
  generateUserSummary,
  generateTopicSummary
} = require("../services/aiService");

// Generate Normal Summary
const createSummary = async (req, res) => {
  try {
    const {
      guildId,
      channelName
    } = req.body;

    let query = {userId: req.user._id};

    if (guildId) {
      query.guildId = guildId;
    }

    if (channelName) {
      query.channelName = channelName;
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    if (messages.length === 0) {
      return res.status(404).json({
        message: "No messages found"
      });
    }

    const validMessages = messages.filter(
      (msg) =>
        msg.content &&
        msg.content.trim().length > 3
    );

    if (validMessages.length < 5) {
      return res.status(400).json({
        message:
          "Need at least 5 meaningful messages to generate a summary"
      });
    }

    const summaryText =
      await generateSummary(validMessages);

    const summary = await Summary.create({
      userId: req.user._id,

      guildId:
        validMessages[0].guildId,

      guildName: 
        validMessages[0].guildName,

      channelName:
        validMessages[0].channelName,

      content:
        summaryText,

      messageCount:
        validMessages.length,

      type:
        "manual"
    });

    const oldSummaries =
  await Summary.find({
    userId: req.user._id
  })
  .sort({ createdAt: -1 })
  .skip(5);

if (oldSummaries.length > 0) {

  await Summary.deleteMany({
    _id: {
      $in: oldSummaries.map(
        summary => summary._id
      )
    }
  });

}



    res.status(201).json(summary);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Summaries
const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({userId: req.user._id})
      .sort({ createdAt: -1 });

    res.status(200).json(summaries);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

const getSummaryById =
  async (req, res) => {

    try {

      const summary =
        await Summary.findOne({
          _id: req.params.id,
          userId: req.user._id
        });

      if (!summary) {

        return res.status(404).json({
          message:
            "Summary not found"
        });

      }

      res.json(summary);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

// User Summary
const createUserSummary = async (req, res) => {
  try {

    const {
      guildId,
      channelName
    } = req.body;

    let query = {userId: req.user._id};

    if (guildId) {
      query.guildId = guildId;
    }

    if (channelName) {
      query.channelName = channelName;
    }



    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    if (messages.length < 5) {
      return res.status(400).json({
        message:
          "Need at least 5 messages"
      });
    }

    const summary =
      await generateUserSummary(messages);

    res.status(200).json({
      content: summary
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// Topic Summary
const createTopicSummary = async (req, res) => {
  try {

    const {
      guildId,
      channelName
    } = req.body;

    let query = {userId: req.user._id};

    if (guildId) {
      query.guildId = guildId;
    }

    if (channelName) {
      query.channelName = channelName;
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    if (messages.length < 5) {
      return res.status(400).json({
        message:
          "Need at least 5 messages"
      });
    }

    const topicSummary =
      await generateTopicSummary(messages);

    res.status(200).json({
      content: topicSummary
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};


const deleteSummary =
  async (req, res) => {

    try {

      const summary =
        await Summary.findOneAndDelete({
          _id: req.params.id,
          userId: req.user._id
        });

      if (!summary) {

        return res.status(404).json({
          message: "Summary not found"
        });

      }

      res.json({
        message: "Summary deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

module.exports = {
  createSummary,
  getSummaries,
  createUserSummary,
  createTopicSummary,
  getSummaryById,
  deleteSummary
};
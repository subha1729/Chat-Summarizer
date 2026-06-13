const axios = require("axios");
const Message = require("../models/Message");
const GuildConnection =
  require("../models/GuildConnection");
const ConnectedAccount =
  require("../models/ConnectedAccount");

const getDiscordGuildChannels = async (guildId) => {
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!botToken) {
    return [];
  }

  try {
    const response = await axios.get(
      `https://discord.com/api/v10/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (response.data || [])
      .filter((channel) => channel && channel.type === 0)
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
      }));
  } catch (error) {
    console.error("Failed to fetch Discord channels:", error.message);
    return [];
  }
};

const saveMessage = async (req, res) => {

  try {

    const ownerDiscordId =
      req.body.ownerDiscordId ||
      req.body.discordId;

    let guild = null;

    if (ownerDiscordId) {
      guild = await GuildConnection.findOne({
        guildId: req.body.guildId,
        discordId: ownerDiscordId,
      });
    }

    if (!guild) {
      guild = await GuildConnection.findOne({
        guildId: req.body.guildId,
      });
    }

    if (!guild) {

      return res.status(404).json({
        message:
          "Guild not connected"
      });

    }

    let ownerUserId =
      guild.userId;

    if (!ownerUserId) {
      const linkedAccount =
        await ConnectedAccount.findOne({
          platform: "discord",
          platformUserId:
            guild.discordId
        });

      if (linkedAccount) {
        ownerUserId =
          linkedAccount.userId;
        guild.userId = ownerUserId;
        await guild.save();
      }
    }

    const message =
      await Message.create({

        ...req.body,

        userId: ownerUserId,

        ownerDiscordId:
          guild.discordId

      });

    res.status(201).json({
      message:
        "Message saved successfully",
      data: message
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};


const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({userId: req.user._id}).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getLatestMessages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;

    const messages = await Message.find({userId: req.user._id})
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getChannels = async (req, res) => {
  try {
    const guildId = req.query.guildId;

    const storedChannels = await Message.distinct("channelName", {
      userId: req.user._id,
      guildId,
    });

    const discordChannels = await getDiscordGuildChannels(guildId);

    const allChannels = [
      ...new Set([
        ...discordChannels.map((channel) => channel.name),
        ...storedChannels,
      ]),
    ].filter(Boolean);

    res.json(allChannels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




module.exports = {
  saveMessage,
  getMessages,
  getLatestMessages,
  getChannels
};
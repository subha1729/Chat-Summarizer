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

    console.log("=== SAVE MESSAGE DEBUG ===");
    console.log("Guild ID:", req.body.guildId);
    console.log("Owner Discord ID:", ownerDiscordId);
    console.log("Guild Name:", req.body.guildName);

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

    // Fallback: Create guild connection if it doesn't exist
    if (!guild) {
      console.log("Guild not found - attempting to create one");
      
      let linkedAccount = null;
      if (ownerDiscordId) {
        linkedAccount = await ConnectedAccount.findOne({
          platform: "discord",
          platformUserId: ownerDiscordId
        });
      }

      if (linkedAccount) {
        console.log("Found linked account, creating guild connection");
        guild = await GuildConnection.create({
          userId: linkedAccount.userId,
          guildId: req.body.guildId,
          guildName: req.body.guildName,
          discordId: ownerDiscordId
        });
        console.log("Guild connection created:", guild._id);
      } else {
        console.log("No linked account found for Discord ID:", ownerDiscordId);
        return res.status(404).json({
          message: "Guild not connected and no Discord account found"
        });
      }
    }

    let ownerUserId = guild.userId;
    console.log("Owner User ID:", ownerUserId);

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
        console.log("Updated guild with user ID:", ownerUserId);
      }
    }

    const message =
      await Message.create({

        ...req.body,

        userId: ownerUserId,

        ownerDiscordId:
          guild.discordId

      });

    console.log("Message saved successfully:", message._id);
    console.log("=========================");

    res.status(201).json({
      message:
        "Message saved successfully",
      data: message
    });

  } catch (error) {

    console.error("=== MESSAGE SAVE ERROR ===");
    console.error(error);
    console.error("===========================");

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
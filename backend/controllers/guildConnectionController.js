const GuildConnection =
  require("../models/GuildConnection");

const ConnectedAccount =
  require("../models/ConnectedAccount");

const connectGuild =
  async (req, res) => {

    try {

      console.log(
        "CONNECT GUILD CALLED"
      );

      console.log(
        "USER:",
        req.user
      );

      console.log(
        "REQUEST BODY:",
        req.body
      );

      const {
        guildId,
        guildName
      } = req.body;

      const account =
        await ConnectedAccount.findOne({
          userId: req.user._id,
          platform: "discord"
        });

      console.log(
        "ACCOUNT:",
        account
      );

      if (!account) {

        return res.status(400).json({
          message:
            "Discord not connected"
        });

      }

      console.log(
        "GUILD ID:",
        guildId
      );

      console.log(
        "DISCORD ID:",
        account.platformUserId
      );

      console.log(
        "CHECKING EXISTING GUILD"
      );

      const existingGuild =
        await GuildConnection.findOne({
          userId:
            req.user._id,
          guildId,
          discordId:
            account.platformUserId
        });

      console.log(
        "EXISTING GUILD:",
        existingGuild
      );

      if (existingGuild) {

        return res.status(400).json({
          message:
            "Guild already connected"
        });

      }

      console.log(
        "CREATING GUILD..."
      );

      const guild =
        await GuildConnection.create({
          userId:
            req.user._id,
          guildId,
          guildName,
          discordId:
            account.platformUserId
        });

      console.log(
        "CREATED GUILD:",
        guild
      );

      return res.status(201).json({
        message:
          "Guild connected successfully",
        guild
      });

    } catch (error) {

      console.log(
        "CONNECT GUILD ERROR:"
      );

      console.log(error);

      return res.status(500).json({
        message:
          error.message
      });

    }

  };

const getUserGuildConnections =
  async (req, res) => {

    try {

      const account =
        await ConnectedAccount.findOne({
          userId: req.user._id,
          platform: "discord"
        });

      if (!account) {

        return res.json([]);

      }

      const guilds =
        await GuildConnection.find({
          discordId:
            account.platformUserId
        });

      for (const guild of guilds) {
        if (!guild.userId) {
          guild.userId =
            req.user._id;
          await guild.save();
        }
      }

      res.json(
        guilds.filter(
          (guild) =>
            String(guild.userId) ===
            String(req.user._id)
        )
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

module.exports = {
  connectGuild,
  getUserGuildConnections
};
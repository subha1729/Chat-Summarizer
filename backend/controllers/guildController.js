const Message =
  require("../models/Message");

const GuildConnection =
  require("../models/GuildConnection");


const getGuilds =
  async (req, res) => {

    try {

      const ConnectedAccount =
        require("../models/ConnectedAccount");

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

      const ownedGuilds =
        guilds.filter(
          (guild) =>
            String(guild.userId) ===
            String(req.user._id)
        );

      console.log(
        "GUILDS:",
        ownedGuilds
      );

      const result =
        guilds.map(
          (guild) => ({
            _id:
              guild.guildId,

            guildName:
              guild.guildName
          })
        );

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

  const getGuildDetails =
  async (req, res) => {
    try {

      const guilds =
        await Message.aggregate([
          {
            $match: {
               userId: req.user._id,
              guildName: {
                $ne: null
              }
            }
          },
          {
            $group: {
              _id: "$guildId",

              guildName: {
                $last: "$guildName"
              },

              messageCount: {
                $sum: 1
              },

              channels: {
                $addToSet:
                  "$channelName"
              }
            }
          }
        ]);

      const result =
        guilds.map(
          (guild) => ({
            guildId:
              guild._id,

            guildName:
              guild.guildName,

            messageCount:
              guild.messageCount,

            channelCount:
              guild.channels.length
          })
        );

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };

module.exports = {
  getGuilds,
  getGuildDetails
};
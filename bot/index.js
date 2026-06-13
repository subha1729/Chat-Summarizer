require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  console.log("MESSAGE EVENT FIRED");

  if (message.author.bot) return;

  console.log(`${message.author.username}: ${message.content}`);

  try {
    
    const response = await axios.post(
           `${process.env.BACKEND_URL}/api/messages`,      {
        discordUser: message.author.username,
        content: message.content,
        channelId: message.channel.id,
        channelName: message.channel.name,
        guildId: message.guild.id,
        guildName: message.guild.name,
        ownerDiscordId: message.guild.ownerId,
      }
    );

    console.log(response.data.message);
  } catch (error) {
    
      console.error("FULL ERROR:");

      console.error(error.response?.data);

      console.error(error.message);

      console.error(error.response?.status);
  }
});

client.login(process.env.DISCORD_TOKEN);
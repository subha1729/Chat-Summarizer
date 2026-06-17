require("dotenv").config();

const express = require("express");
const axios = require("axios");
const {
  Client,
  GatewayIntentBits,
} = require("discord.js");

const app = express();

// Health Check Route (Required for Render)
app.get("/", (req, res) => {
  res.send("Chat Summarizer Bot Running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Health server running on port ${
      process.env.PORT || 3000
    }`
  );
});

// Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Bot Ready
client.once("clientReady", () => {
  console.log(
    `Logged in as ${client.user.tag}`
  );
});

// Message Listener
client.on(
  "messageCreate",
  async (message) => {

    if (message.author.bot) return;

    console.log(
      "MESSAGE EVENT FIRED"
    );

    console.log(
      `${message.author.username}: ${message.content}`
    );

    try {

      console.log(
        "Sending message to backend..."
      );

      console.log(
        "Backend URL:",
        process.env.BACKEND_URL
      );

      const response =
        await axios.post(
          `${process.env.BACKEND_URL}/api/messages`,
          {
            discordUser:
              message.author.username,

            content:
              message.content,

            channelId:
              message.channel.id,

            channelName:
              message.channel.name,

            guildId:
              message.guild.id,

            guildName:
              message.guild.name,

            ownerDiscordId:
              message.guild.ownerId,
          }
        );

      console.log(
        "✅ Message saved:",
        response.data.message
      );

    } catch (error) {

      console.error(
        "❌ FULL ERROR:"
      );

      console.error(
        error.response?.data
      );

      console.error(
        error.message
      );

      console.error(
        error.response?.status
      );
    }
  }
);

// Debug Token
console.log(
  "DISCORD_TOKEN:",
  process.env.DISCORD_TOKEN?.substring(
    0,
    20
  )
);

console.log(
  "TOKEN LENGTH:",
  process.env.DISCORD_TOKEN?.length
);

// Login Bot
client.login(
  process.env.DISCORD_TOKEN
);
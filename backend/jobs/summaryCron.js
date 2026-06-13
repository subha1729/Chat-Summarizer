const cron = require("node-cron");

const Message = require("../models/Message");
const Summary = require("../models/Summary");
const { generateSummary } = require("../services/aiService");

cron.schedule("0 23 * * *", async () => {
    // 11:00 pm daily
  try {
    console.log("Running Daily Summary...");

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(100);

    if (messages.length === 0) return;

    const summaryText =
      await generateSummary(messages);

    await Summary.create({
      guildId: messages[0].guildId,
      content: summaryText,
      messageCount: messages.length,
      type: "daily"
    });

    console.log("Daily Summary Saved");
  } catch (error) {
    console.error(error);
  }
});
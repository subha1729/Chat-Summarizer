const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

console.log(
  "OPENROUTER KEY EXISTS:",
  !!process.env.OPENROUTER_API_KEY
);

const askAI = async (prompt) => {
  let lastError;

  console.log("ASK AI CALLED");

  for (let i = 0; i < 3; i++) {
    try {
      const completion =
        await client.chat.completions.create({
          model: "openrouter/auto",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          // Makes responses shorter and more consistent
          temperature: 0.2,
          max_tokens: 400,
        });

      return completion.choices[0].message.content;
    } catch (error) {
      lastError = error;

      console.log("OPENROUTER ERROR:");
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      console.log(`OpenRouter retry ${i + 1}/3`);

      await new Promise((resolve) =>
        setTimeout(resolve, 5000)
      );
    }
  }

  throw lastError;
};

const generateSummary = async (messages) => {
  const chatText = messages
    .map(
      (msg) =>
        `${msg.discordUser}: ${msg.content}`
    )
    .join("\n");

  console.log("=== CHAT TEXT SENT TO AI ===");
  console.log(chatText);
  console.log("============================");

  const prompt = `
You are an expert Discord conversation summarizer.

Return ONLY Markdown.

# 📋 Conversation Summary

## 📌 Main Topics
- **Topic** — max 8 words
- **Topic** — max 8 words
- **Topic** — max 8 words

## ✅ Important Decisions
- **Decision** — max 8 words
- None

## 🚀 Action Items
- **Action** — max 8 words
- None

## 📝 Overall Summary
- Maximum TWO short bullet points.
- Highlight only the most important ideas.

Rules:
- Keep everything concise.
- Maximum 3 bullets per section.
- Never write long sentences.
- Use bold for names, repositories, games, assignments, playlists, technologies, links, and important keywords.
- Ignore greetings and casual chatter unless most of the conversation is greetings.
- No introduction.
- No conclusion.
- Clean Markdown only.

Conversation:
${chatText}
`;

  return await askAI(prompt);
};

const generateUserSummary = async (messages) => {
  const chatText = messages
    .map(
      (msg) =>
        `${msg.discordUser}: ${msg.content}`
    )
    .join("\n");

  const prompt = `
You are an expert Discord conversation summarizer.

Return ONLY Markdown.

# 👥 User Contributions

For each user:

## **Username**
- **Main contribution** — max 8 words
- **Important point** — max 8 words (optional)

Rules:
- Maximum TWO bullets per user.
- Every bullet MUST be under 8 words.
- Use short phrases, NOT sentences.
- Bold only important words.
- Skip greetings, emojis, reactions, jokes, and filler messages.
- Skip users without meaningful contributions.
- Avoid repeating information.
- Keep the output compact and easy to scan.
- No introduction.
- No conclusion.

Conversation:
${chatText}
`;

  return await askAI(prompt);
};

const generateTopicSummary = async (messages) => {
  const chatText = messages
    .map(
      (msg) =>
        `${msg.discordUser}: ${msg.content}`
    )
    .join("\n");

  const prompt = `
You are an expert Discord conversation analyzer.

Return ONLY Markdown.

# 📚 Topic Summary

Generate ONLY the 2-3 most important topics.

For each topic:

## 🎯 **Topic Name**
- **Key point** — max 8 words
- **Key point** — max 8 words
- **Key point** — max 8 words (optional)

Rules:
- Maximum THREE topics.
- Maximum THREE bullets per topic.
- Every bullet MUST be under 8 words.
- Use phrases instead of sentences.
- Merge similar discussions.
- Highlight only important names, repositories, games, assignments, technologies, links, and decisions.
- Ignore greetings and small talk.
- No introduction.
- No conclusion.
- Clean Markdown only.

Conversation:
${chatText}
`;

  return await askAI(prompt);
};

module.exports = {
  generateSummary,
  generateUserSummary,
  generateTopicSummary,
};
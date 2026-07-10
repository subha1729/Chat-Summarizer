const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

console.log(
  "OPENROUTER KEY EXISTS:",
  !!process.env.OPENROUTER_API_KEY
);

const askAI = async (prompt, maxTokens = 250) => {
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
          temperature: 0.1,
          max_tokens: maxTokens,
        });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      lastError = error;

      console.log("OPENROUTER ERROR");
      console.log(error);

      console.log(`Retry ${i + 1}/3`);

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
    }
  }

  throw lastError;
};

// ======================================================
// MAIN SUMMARY
// ======================================================

const generateSummary = async (messages) => {
  const chatText = messages
    .map((msg) => `${msg.discordUser}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an expert Discord conversation summarizer.

Return ONLY Markdown.

# 📋 Main Summary

## 📌 Main Topics
- **Topic**
- **Topic**
- **Topic**

## ✅ Important Decisions
- **Decision**
- None

## 🚀 Action Items
- **Task**
- None

## 📝 Overall Summary
- Short bullet.
- Short bullet.

Rules:
- Maximum THREE bullets per section.
- Every bullet MUST be under 8 words.
- NEVER write long sentences.
- Use short phrases.
- Highlight names, technologies, repositories, games, assignments, links and keywords using **bold**.
- Ignore greetings and casual chatter.
- No introduction.
- No conclusion.
- Markdown only.

Conversation:
${chatText}
`;

  return await askAI(prompt, 250);
};

// ======================================================
// USER SUMMARY
// ======================================================

const generateUserSummary = async (messages) => {
  const chatText = messages
    .map((msg) => `${msg.discordUser}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an expert Discord conversation analyzer.

Return ONLY Markdown.

# 👥 User Contributions

List ONLY users with meaningful contributions.

Format EXACTLY like this:

## **Username**
- **Main Contribution:** short phrase
- **Key Point:** short phrase

Rules:
- Maximum FIVE users.
- Skip greetings, emojis, reactions and jokes.
- Maximum TWO bullets per user.
- Every bullet MUST contain ONLY 2-6 words.
- NEVER write complete sentences.
- Use noun phrases only.
- Highlight important words using **bold**.
- Focus on decisions, ideas, repositories, bugs, technologies, assignments, links, plans and tasks.
- Remove duplicate information.
- No explanations.
- No conclusion.
- Markdown only.

Conversation:
${chatText}
`;

  return await askAI(prompt, 180);
};

// ======================================================
// TOPIC SUMMARY
// ======================================================

const generateTopicSummary = async (messages) => {
  const chatText = messages
    .map((msg) => `${msg.discordUser}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an expert Discord conversation analyzer.

Return ONLY Markdown.

# 📚 Topic Summary

Extract ONLY the TWO or THREE most important topics.

Format EXACTLY like this:

## 🎯 **Topic Name**
- **Keyword**
- **Keyword**
- **Keyword**

Rules:
- Maximum THREE topics.
- Maximum THREE bullets per topic.
- Every bullet MUST contain ONLY 2-6 words.
- NEVER write complete sentences.
- Use keywords or short phrases only.
- Merge similar discussions.
- Ignore greetings, memes, reactions and small talk.
- Highlight important names, repositories, technologies, games, assignments, links and decisions using **bold**.
- Remove duplicate information.
- No explanations.
- No conclusion.
- Markdown only.

Conversation:
${chatText}
`;

  return await askAI(prompt, 180);
};

module.exports = {
  generateSummary,
  generateUserSummary,
  generateTopicSummary,
};
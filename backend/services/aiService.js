const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

console.log(
  "Gemini Key Prefix:",
  process.env.GEMINI_API_KEY?.substring(0, 10)
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});
console.log("Gemini initialized");

const askGemini = async (prompt) => {
  let lastError;

  for (let i = 0; i < 3; i++) {
    try {
      const result =
        await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      lastError = error;

      console.log(
        `Gemini retry ${i + 1}/3`
      );

      await new Promise(resolve =>
        setTimeout(resolve, 2000)
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

  const prompt = `
You are an expert Discord chat summarizer.

Analyze the conversation and return ONLY valid markdown.

Format:

## Main Topics
- topic
- topic

## Important Decisions
- decision
- decision

## Action Items
- action
- action

## Overall Summary
Short paragraph (2-3 lines).

Rules:
- Use only information present in the chat.
- Do not invent details.
- If a section has no content write:
  - None discussed
- Keep bullets under 10 words.
- Maximum 120 words total.

Conversation:
${chatText}
`;

  return await askGemini(prompt);
};

const generateUserSummary = async (messages) => {
  const chatText = messages
    .map(
      (msg) =>
        `${msg.discordUser}: ${msg.content}`
    )
    .join("\n");

  const prompt = `
Analyze the Discord conversation.

Create a User Contributions report.

Format:

## User Contributions

### Username
- contribution
- contribution

### Username
- contribution
- contribution

Rules:
- Include only users who contributed meaningful information.
- Ignore greetings and one-word messages.
- Use only information from the conversation.
- Maximum 2 bullet points per user.
- Keep bullets under 10 words.
- Return valid markdown only.

Conversation:
${chatText}
`;

  return await askGemini(prompt);
};

const generateTopicSummary = async (messages) => {
  const chatText = messages
    .map(
      (msg) =>
        `${msg.discordUser}: ${msg.content}`
    )
    .join("\n");

  const prompt = `
Analyze the Discord conversation.

Group discussion by topics.

Return:

## Topics

### Topic Name
- point 1
- point 2

### Topic Name
- point 1
- point 2

Rules:
- Maximum 5 topics
- Keep points short
- Do not invent information

Conversation:
${chatText}
`;

  return await askGemini(prompt);
};


module.exports = {
  generateSummary,
  generateUserSummary,
  generateTopicSummary
};
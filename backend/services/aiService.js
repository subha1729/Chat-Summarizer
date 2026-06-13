const axios = require("axios");

const generateSummary = async (messages) => {
  try {
    const chatText = messages
      .map(msg => `${msg.discordUser}: ${msg.content}`)
      .join("\n");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",

        prompt: `
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
`,
        stream: false,
      }
    );

    return response.data.response;

  } catch (error) {
    console.error("Ollama Error:", error.message);
    throw error;
  }
};


const generateUserSummary = async (messages) => {
  try {
    const chatText = messages
      .map(msg => `${msg.discordUser}: ${msg.content}`)
      .join("\n");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",

        prompt: `
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
`,
        stream: false,
      }
    );

    return response.data.response;

  } catch (error) {
    console.error("Ollama Error:", error.message);
    throw error;
  }
};


const generateTopicSummary = async (messages) => {
  const chatText = messages
    .map(msg => `${msg.discordUser}: ${msg.content}`)
    .join("\n");

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.2",

      prompt: `
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
`,
      stream: false
    }
  );

  return response.data.response;
};

module.exports = {
  generateSummary,
  generateUserSummary,
  generateTopicSummary
};
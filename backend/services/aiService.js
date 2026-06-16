const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

console.log(
"Gemini Key Prefix:",
process.env.GEMINI_API_KEY?.substring(0, 10)
);

console.log(
"Gemini Key Length:",
process.env.GEMINI_API_KEY?.length
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

// ==========================
// MAIN SUMMARY
// ==========================
const generateSummary = async (messages) => {
const chatText = messages
.map(
(msg) =>
`${msg.discordUser}: ${msg.content}`
)
.join("\n");

const prompt = `
You are an expert Discord community analyst.

Analyze the conversation and return ONLY markdown.

Rules:

* Use ONLY information present in the conversation.
* Never invent information.
* Ignore greetings, emojis, spam and repeated test messages.
* Merge related topics.
* Keep output concise.
* Maximum 250 words.

Return in EXACT format:

# Conversation Summary

## Main Topics

* Topic

## Key Insights

* Insight

## Important Decisions

* Decision

## Action Items

* Action

## Key Participants

* Username: contribution summary

## Overall Summary

A concise 3-5 sentence summary.

If the conversation is only testing, greetings or spam:

# Conversation Summary

## Main Topics

* Testing

## Key Insights

* No meaningful discussion

## Important Decisions

* None discussed

## Action Items

* None discussed

## Key Participants

* Participants were testing the system

## Overall Summary

The conversation consisted primarily of test messages and did not contain meaningful discussion.

Conversation:
${chatText}
`;

return await askGemini(prompt);
};

// ==========================
// USER SUMMARY
// ==========================
const generateUserSummary = async (messages) => {
const chatText = messages
.map(
(msg) =>
`${msg.discordUser}: ${msg.content}`
)
.join("\n");

const prompt = `
You are an expert collaboration analyst.

Analyze the conversation and summarize each participant's contribution.

Rules:

* Ignore greetings and meaningless messages.
* Include only meaningful contributors.
* Maximum 3 bullet points per user.
* Do not invent information.
* Return ONLY markdown.

Format:

# User Contributions

## Username

* Contribution
* Contribution

## Username

* Contribution
* Contribution

Conversation:
${chatText}
`;

return await askGemini(prompt);
};

// ==========================
// TOPIC SUMMARY
// ==========================
const generateTopicSummary = async (messages) => {
const chatText = messages
.map(
(msg) =>
`${msg.discordUser}: ${msg.content}`
)
.join("\n");

const prompt = `
You are an expert discussion analyst.

Analyze the conversation and group messages into discussion topics.

Rules:

* Combine related discussions.
* Ignore greetings, spam and test messages.
* Maximum 5 topics.
* Keep points concise.
* Do not invent information.
* Return ONLY markdown.

Format:

# Topic Analysis

## Topic Name

* Point
* Point

## Topic Name

* Point
* Point

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

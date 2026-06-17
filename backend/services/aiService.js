const OpenAI = require("openai");

const client = new OpenAI({
baseURL: "https://openrouter.ai/api/v1",
apiKey: process.env.OPENROUTER_API_KEY,
});

console.log("OPENROUTER KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

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

const prompt = `
You are an expert Discord chat summarizer.

Return markdown only.

## Main Topics

* topic

## Important Decisions

* decision

## Action Items

* action

## Overall Summary

Short summary.

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
Analyze the conversation.

Return markdown only.

# User Contributions

## Username

* contribution

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
Group discussion by topics.

Return markdown only.

# Topic Analysis

## Topic

* point

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

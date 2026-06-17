require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function test() {
  const completion =
    await client.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: "Say hello",
        },
      ],
    });

  console.log(
    completion.choices[0].message.content
  );
}

test();
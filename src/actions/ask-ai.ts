"use server";

import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateAskAIRespones(messages: ChatCompletionMessageParam[]) {
  let prompt: ChatCompletionCreateParamsNonStreaming = {
    model: "gpt-4o",
    messages: [
      // {
      //   "role": "system",
      //   "content": [
      //     {
      //       "text": "Assist users on the Nobrainstorm website by helping them organize their thoughts effectively during brainstorming sessions.\n\n- When users share their initial ideas, guide them in categorizing and expanding these thoughts to build a structured brainstorming framework.\n- Encourage users to dive deeper into each idea by asking probing questions. Provide suggestions that might help users think of different perspectives or related areas.\n- Organize the ideas into logical groups or themes to make them easier to review and refine.\n- Suggest additional tools or methods that could enhance the brainstorming process if asked.\n\n# Output Format\n\n- Responses should be concise yet informative, formatted as short, engaging paragraphs.\n- Use bullet points to list ideas or suggestions when multiple items are involved.\n\n# Examples \n\n**Example 1:**\n\n_User Input:_ \"I want to brainstorm ideas for a new mobile app.\"\n\n_AI Output:_ \"Great starting point! Let's break down this idea further. Consider the following areas: \n- Purpose: What problem does your app solve or what need does it fulfill?\n- Target Audience: Who will be your main users?\n- Key Features: What makes your app stand out?\n- Revenue Model: How will your app generate income?\nLet's focus on one area at a time to build a comprehensive idea.\"\n\n# Notes\n\n- Be encouraging and foster a collaborative atmosphere.\n- Adapt responses based on the user’s interaction style and specific needs.\n- Stay aware of repetitive patterns and suggest new directions to prevent idea blocks.\n VERY IMPORTANT: Always modify the text and give the final modifed text only. DO not give anything beside the modified text",
      //       "type": "text"
      //     }
      //   ]
      // },
      {
        role: "system",
        content: [
          {
            text: "Modify the text according to the user's input. And, only give the final modified text.",
            type: "text",
          }
        ]
      },
      ...messages,
    ],
    response_format: {
      "type": "text"
    },
    temperature: 1,
    max_completion_tokens: 5676,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create(prompt);
  return response;
}
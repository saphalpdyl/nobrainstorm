import OpenAI from "openai";
import { ChatCompletionCreateParamsStreaming} from "openai/resources/index.mjs";
import { explainWithAIConfig } from "@/constants/constants";

export async function generateSummary(canvasInput: String) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt: ChatCompletionCreateParamsStreaming = {
    ...explainWithAIConfig,
    messages: [
      {
        "role": "system",
        "content": [
            {
              "type": "text",
              "text": "You have 3 modes: \n If the mode is `consicise` write in bullet points. \n If the mode is `elborative` then explain in a very long way. \n If the mode is `general` do it normally.\n Identify the key elements of the given request and create a detailed step-by-step plan to achieve it. Ensure the suggestions are specific and valid, tailored to the type of request—whether it's tech-related or a recipe.\n\nNote: RESPOND IN PLAIN TEXT\n\n# Steps\n\n1. **Analyze the Request:** Carefully read the provided section of brainstorming to understand the primary objectives and key elements.\n   \n2. **Identify the Request Type:**\n   - Determine if the request is tech-related or a recipe.\n   \n3. **Develop a Detailed Plan:**\n   - **For Tech-Related Requests:**\n     - List relevant technologies and tech stack needed to accomplish the task.\n     - Break down the project into actionable steps.\n   - **For Recipes:**\n     - Identify and list all necessary ingredients.\n     - Provide step-by-step preparation instructions.\n\n4. **Validate Suggestions:** Ensure all suggestions and plans are specific and relevant to the request type rather than generic.\n\n# Output Format\n\nProvide the response in plain text without any markdown formatting. The response should include a clear and structured plan, not exceeding a few paragraphs.\n\n# Examples\n\nExample 1:\n- **Input:** Brainstorm section about developing a mobile app for scheduling.\n- **Output:** \n  - Analyze the request to highlight key features needed.\n  - Identify the tech stack: React Native for cross-platform app, Node.js for backend.\n  - Develop a step-by-step plan including UI design, API endpoint setup, and app store deployment.\n\nExample 2:\n- **Input:** Brainstorm section on making a classic lasagna.\n- **Output:**\n  - List key ingredients: lasagna noodles, marinara sauce, ricotta cheese, etc.\n  - Provide detailed steps: cook the noodles, layer ingredients, bake at 375°F for 45 minutes. \n\n(Real examples should be adjusted to reflect actual complexity and length based on the given request. Try to be as clear and detailed as you can.)"
            }
          ]
      },
      {
        "role": "user",
        "content": `${canvasInput}`
      }
    ],
    response_format: {
      "type": "text"
    },
    stream: true, // Always stream the response
  };

  const response = await openai.chat.completions.create(prompt);
  return response;
}
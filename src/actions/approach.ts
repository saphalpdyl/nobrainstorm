"use server";

import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming} from "openai/resources/index.mjs";
import { approachConfig } from "@/constants/constants";

export async function generateApproach(canvasInput: String) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt: ChatCompletionCreateParamsNonStreaming = {
    ...approachConfig,
    messages: [
      {
        "role": "system",
        "content": [
            {
                "text": "Provide four distinct approaches to achieve a user's goal based on the context they provide. Ensure you clearly understand the user-provided context before crafting the list of ways they can achieve their goal.\n\nReview the given context thoroughly and identify key aspects of the user's goal. Think creatively to devise four separate solutions or methods for reaching the goal. Each approach should be distinct and viable given the context.\n\n# Steps\n\n1. **Understand the Context**: Carefully read and comprehend the user-provided context and the specific goal.\n2. **Identify Key Factors**: Determine the main elements and constraints involved.\n3. **Develop Approaches**: Devise two distinct strategies outlining steps for achieving the goal.\n4. **Detail the Steps**: Break down each approach into a sequence of logical steps.\n\n# Output Format\n\nWrap the solution with the `<Approach>` and `</Approach>` tags. Use the following JSON structure:\n\n```json\n{\n  \"Approaches\": [\n    [\"Step 1:\", \"Step 2:\", \"Step 3...\"],\n    [\"Step A:\", \"Step B...\"], \n.........\n  ]\n}\n```\n\n# Examples\n\n**Provided Context**: \"A user wants to lose weight\"\n\n**Example Output**:\n\n<Approach>\n{\n  \"Approaches\": [\n    [\"Step 1: Calculate daily calorie needs\", \"Step 2: Plan a calorie deficit diet\", \"Step 3: Monitor progress weekly\"],\n    [\"Step A: Start a regular exercise routine\", \"Step B: Incorporate strength training twice a week\", \"Step C: Increase daily step count\"],\n..............\n  ]\n}\n</Approach> \n\n(Note: Real examples might involve more specific actions depending on user context, like diet types or exercise preferences.)",
                "type": "text"
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
  };

  const response = await openai.chat.completions.create(prompt);
  return response;
}
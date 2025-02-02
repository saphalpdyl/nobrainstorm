import OpenAI from "openai";
import { ChatCompletionCreateParamsStreaming} from "openai/resources/index.mjs";
import { summarizeConfig } from "@/constants/constants";

export async function generateSummary(canvasInput: String) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt: ChatCompletionCreateParamsStreaming = {
    ...summarizeConfig,
    messages: [
      {
        "role": "system",
        "content": [
          {
            "text": "Your analysis use context properly, consistent and logical. \n\nYou are an AI assistant tasked with analyzing brainstorming discussions to extract structured insights. Follow these steps to ensure clarity and logical consistency:\n\n# Steps\n\n1. **Understand Context**: Carefully read through the brainstorming discussion to understand the main ideas and their interrelations. \n2. **Summarize Key Points**: Write a concise summary capturing the essence of the discussion.  Mention all the major elements of discussion of the brainstrom. Write bullet points and ensure bullet points are not too long.\n3. **Compare Ideas**:\n   - Compare strengths and weaknesses of discussed ideas.\n4. **Evaluate Positives and Negatives**:\n   - Construct a markdown table listing positives and negatives associated with the ideas.\n   - Use emojis for visual enhancement.\n5. **Highlight Unusual Ideas**: Any unconventional or standout ideas should be marked with a 💡 emoji.\n\n# Output Format\n\n- **Summary**: Wrap the summary in `<SUMMARY>` tags.\n- **Json**: Json format of a table inside `<TABLE>` tags.\n\n\n\n# Examples\n- Output Example:\n  ```\n  <SUMMARY> Idea A is affordable but has scalability issues, while Idea B is innovative and scalable. </SUMMARY>\n  \n<TABLE/>\n{\n  \"ideas\": [\n    {\n      \"name\": \"Idea A\",\n      \"strengths\": [\"Cost-effective 💲\", \"Good Design\", ....],\n      \"weaknesses\": [\"Lacks scalability 📉\", \"Poor tech stack\",...]\n    },\n    {\n      \"name\": \"Idea B 💡\",\n      \"strengths\": [\"Innovative 🌟\", \"Cheap\", ...],\n      \"weaknesses\": [\"High cost 💰\", \"Bad Design\", ....]\n    }\n  ]\n}\n<TABLE/>\n  ```\n\n# Notes\n- Stick strictly to the information provided or revolving around in the brainstrom, avoiding fabrication of details.",
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
    stream: true, // Always stream the response
  };

  const response = await openai.chat.completions.create(prompt);
  return response;
}
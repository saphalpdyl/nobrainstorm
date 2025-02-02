"use server";

import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {lineGraphConfig}  from "../constants/constants"


export async function generateLineGraph(canvasInput: String) {
  let prompt: ChatCompletionCreateParamsNonStreaming = {
    ... lineGraphConfig,
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Analyze the brainstorming document to compare ideas based on their time taken and complexity. Plot a graph to visually represent their values.\n\n- Accept a structured dataset that outlines various approaches, including their complexity and time taken.\n- Use the provided sample data as a template to interpret the information.\n- Focus on comparing the time and complexity for each approach and visually plotting this comparison.\n\n# Steps\n\n1. **Data Interpretation**: Examine the dataset to understand the values for 'complexity' and 'time' for each approach.\n2. **Graph Plotting**: \n   - Use a graph to plot each approach on a two-dimensional axis, where one axis represents 'complexity' and the other 'time.'\n   - Ensure that each point on the graph corresponds to an approach from the dataset.\n\n# Output Format\n1. Put the output json in <LINEGRAPH> </LINEGRAPH> tags.\n\n- Produce a visual graph depicting the time and complexity of each approach.\n- Ensure clarity in labeling both axes and each data point with the respective approach name.\n\nNOTE: DO NO RETURN ANYTHING OTHER THAN THE TAGS.\n\n# Example Output\n<LINEGRAPH>\n{\n  \"graphs\": [\n    {\n      \"name\": \"Comparison of Approaches\",\n      \"x_axis\": \"Complexity\",\n      \"y_axis\": \"Time\",\n      \"data\": [\n        { \"name\": \"2 word description of the element.\", \"complexity\": 0.6, \"time\": 0.3 }, \n      ]\n    }\n  ]\n}\n</LINEGRAPH>\n\n### Graph Output\n- Plot each data point on a graph where the x-axis represents 'complexity' and the y-axis represents 'time.'\n- The point should be labeled with the 'name' of the approach.\n\n# Notes\n\n- Consider edge cases where complexity or time might be at min/max limits.\n- Ensure the graph is readable and easily interpretable, with balanced scales on the axes.\n- Make sure complexity and time are both in between 0 and 1."
          },
        ],  
      },
      {
        "role" : "user",
        "content" : `${canvasInput}`
      }
    ],
    response_format: {
      "type": "text"
    },
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create(prompt);

  return response;
}


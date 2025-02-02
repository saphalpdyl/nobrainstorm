"use server";

import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";
import { summarizeConfig } from "@/constants/constants";

export async function generateTodoList(canvasInput: String) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt: ChatCompletionCreateParamsNonStreaming = {
    ...summarizeConfig,
    messages: [
      {
        "role": "system",
        "content": [
          {
            "text": `You are an AI assistant specializing in converting brainstorming discussions into actionable todo lists. Your goal is to identify and structure concrete tasks while maintaining context and relationships between items.

# Analysis Steps
1. Read through the brainstorming content carefully
2. Identify actionable items and implicit tasks
3. Group related tasks together
4. Assign priorities and estimated effort
5. Structure dependencies between tasks

# Output Requirements
- Extract ONLY actionable tasks (no general notes or ideas)
- Each task must be specific and completable
- Include context when necessary
- Preserve any mentioned deadlines or time constraints
- Indicate task dependencies where present

# Priority Levels
- 🔴 High: Urgent or blocking other tasks
- 🟡 Medium: Important but not urgent
- 🟢 Low: Nice to have

# Effort Estimation
- 'quick' Quick (< 1 hour)
- 'medium' Medium (half-day)
- 'lengthy' Substantial (full day+)

# Output Format
1. JSON structure wrapped in <JSON> tags
<JSON>
{
  "tasks": [
    {
      "id": "1",
      "title": "Set up development environment",
      "effort": "quick",
      "deadline": null,
      "priortiy": "🟡"
    }
  ]
}
</JSON>

# Rules
3. Don't create tasks for vague or non-actionable items
4. Preserve any specific technical requirements or constraints mentioned
5. Include context in parentheses when task description alone might be ambiguous`,
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
    stream: false,
  };

  const response = await openai.chat.completions.create(prompt);
  return response;
}
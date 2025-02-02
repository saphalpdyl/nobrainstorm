"use server";

import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {lineGraphConfig}  from "../constants/constants"
import {getTextBetweenTags} from "@/lib/utils";
import { generateDalleImage } from "@/actions/dalle";

export async function generateImage(canvasInput: String) {
  let prompt: ChatCompletionCreateParamsNonStreaming = {
    ... lineGraphConfig,
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": `You will receive an image, you need to see the image and you need to create an image generation prompt for DALLE-3 to generate the same image. The style of the image should be a simple, doodle like drawing but do get into detail about the image.  The image should also consider spatial directions of the elements in it.
                The prompt should be in the form of:
                <PROMPT> generated_prompt_here </PROMPT>
            `
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

  var message = response.choices[0].message.content
  if (message === null){
    return response
    }
  var url = generateDalleImage(getTextBetweenTags(message, "<PROMPT>"));
  return url
}

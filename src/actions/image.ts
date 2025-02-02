"use server";

import OpenAI from "openai";
import { lineGraphConfig } from "@/constants/constants";
import { getTextBetweenTags } from "@/lib/utils";
import { generateDalleImage } from "@/actions/dalle";
import { readFile } from "fs/promises";


// Environment variables are safer than hardcoding API keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";


// Initialize OpenAI client
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Function to encode the image to base64
export async function encodeImage(imagePath: string): Promise<string> {
  try {
    const imageBuffer = await readFile(imagePath);
    return imageBuffer.toString("base64");
  } catch (error) {
    throw new Error(
      `Failed to encode image: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// Main function to analyze image
export async function analyzeImage(base64Image: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
        ... lineGraphConfig,
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You will receive an image, you need to see the image and you need to create an image generation prompt for DALLE-3 to generate the same image. The style of the image should be a simple and very minimalistic, doodle like drawing but do get into detail about the image. The image should also consider spatial directions of the elements in it. It is very necessary that the picture has a white background
                    The prompt MUST be in the form of:
                    <PRE> generated_prompt_here </PRE>
                `,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    var message = response.choices[0].message.content;
    if (message === null) {
      return "";
    }

    console.log(message);
    const text = getTextBetweenTags(message, "PRE");
    console.log("TEXT", text);
    var url = generateDalleImage(text);
    return url;
  } catch (error) {
    throw new Error(
      `Failed to analyze image: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

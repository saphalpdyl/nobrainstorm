import OpenAI from 'openai';

// Types for configuration and response
type ImageSize = '1024x1024' | '1792x1024' | '1024x1792';
type ImageQuality = 'standard' | 'hd';
type ImageStyle = 'vivid' | 'natural';

interface GenerateImageOptions {
  size?: ImageSize;
  quality?: ImageQuality;
  style?: ImageStyle;
  model?: 'dall-e-2' | 'dall-e-3';
  n?: number;
}


// Error class for image generation failures
class ImageGenerationError extends Error {
  constructor(
    message: string,
    public readonly originalError: unknown
  ) {
    super(message);
    this.name = 'ImageGenerationError';
  }
}

// Main utility function
export async function generateDalleImage(
  prompt: string,
  options: GenerateImageOptions = {}
) {
  // Validate input
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  // Default configuration
  const config = {
    model: options.model || 'dall-e-3',
    size: options.size || '1024x1024',
    quality: options.quality || 'standard',
    style: options.style || 'vivid',
    n: options.n || 1
  };

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const response = await openai.images.generate({
      model: config.model,
      prompt,
      n: config.n,
      size: config.size,
      quality: config.quality,
      style: config.style
    });

    // Extract the results
    const result: string =  response.data[0].url ?? "";

    return result;
  } catch (error) {
    // Handle specific API errors
    if (error instanceof OpenAI.APIError) {
      throw new ImageGenerationError(
        `DALL-E API Error: ${error.message}`,
        error
      );
    }
    
    // Handle other errors
    throw new ImageGenerationError(
      'Failed to generate image',
      error
    );
  }
}

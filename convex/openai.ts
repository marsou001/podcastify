import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.union(
      v.literal("alloy"), v.literal("shimmer"), v.literal("nova"), v.literal("echo"), v.literal("fable"), v.literal("onyx"), v.literal("ash"),v.literal("coral"),v.literal("sage")
    )
  },
  handler: async (_, args) => {
    
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: args.voice,
      input: args.input,
    });

    const buffer = await mp3.arrayBuffer();
    return buffer;
  }
})

export const generateThumbnailAction = action({
  args: { input: v.string() },
  handler: async (_, args) => {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: args.input,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    })

    const url = response.data[0].url;
    if (url === undefined) {
      throw new Error("Error generating url")
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  }
})
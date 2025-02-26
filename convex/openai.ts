import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.union(
      v.literal("alloy"), v.literal("shimmer"), v.literal("nova"), v.literal("echo"), v.literal("fable"), v.literal("onyx"), v.literal("ash"),v.literal("coral"),v.literal("sage")
    )
  },
  handler: async (_, args) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: args.voice,
      input: args.input,
    });

    const buffer = await mp3.arrayBuffer();
    return buffer;
  }
})
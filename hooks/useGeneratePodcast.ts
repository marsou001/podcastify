import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useAction } from "convex/react";
import { Blob, File } from "node:buffer";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useGeneratePodcast({
  setAudioStorageId, setAudio, voiceType, voicePrompt
}: GeneratePodcastProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  async function generatePodcast() {
    setIsGenerating(true);
    setAudio("");

    if (voicePrompt === "") {
      // TODO: show error message
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      })
      const blob = new Blob([response], { type: "audio/mp3" });
      const filename = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], filename, { type: "audio/mp3" });
    } catch (error) {
      console.log("Error generating podcast", error)
    } finally {
      setIsGenerating(false);
    }
  }

  return {
    isGenerating,
    generatePodcast,
  }
}

export default useGeneratePodcast;
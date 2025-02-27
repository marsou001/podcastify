import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { isStorageId } from "@/types/type-guards";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function useGeneratePodcast({
  setAudioStorageId, setAudio, voiceType, voicePrompt
}: Omit<GeneratePodcastProps, "audio" | "setVoicePrompt" | "setAudioDuration">) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcasts.getURL);

  async function generatePodcast() {
    setIsGenerating(true);
    setAudio("");

    if (voicePrompt === "") {
      toast("Please provide a prompt to generate a prodcast!")
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
      const uploaded = await startUpload([file]);
      const uploadResponse = uploaded[0].response;

      if (uploadResponse === null || typeof uploadResponse !== "object" || !("storageId" in uploadResponse)) {
        throw new Error("storageId doesn't exist in uploadResponse");
      }

      const { storageId } = uploadResponse;

      if (!isStorageId(storageId)) {
        throw new Error("storageId isn't a string!");
      }

      setAudioStorageId(storageId);
      const audioURL = await getAudioUrl({ storageId });
      
      if (!audioURL) {
        throw new Error("Audio is not found");
      }

      setAudio(audioURL);
      toast("Podcast generated successfully!")
    } catch (error) {
      toast("Error generating podcast: " + error)
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
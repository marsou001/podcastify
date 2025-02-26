import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { isStorageId } from "@/types/type-guards";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useGeneratePodcast({
  setAudioStorageId, setAudio, voiceType, voicePrompt
}: GeneratePodcastProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

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
      const audioURL = useQuery(api.podcasts.getURL, { storageId });
      
      if (!audioURL) {
        throw new Error("Audio is not found")
      }

      setAudio(audioURL);
      
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
import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import useGeneratePodcast from "@/hooks/useGeneratePodcast";

function GeneratePodcast({
  audio,
  setAudio,
  setAudioDuration,
  setAudioStorageId,
  voiceType,
  voicePrompt,
  setVoicePrompt,
}: GeneratePodcastProps) {
  const { isGenerating, generatePodcast } = useGeneratePodcast({ setAudioStorageId, setAudio, voiceType, voicePrompt });

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-white-1 text-base font-bold leading-normal">
          AI Prompt to generate podcast
        </Label>

        <Textarea
          className="text-gray-1 bg-black-1 text-base font-light leading-normal placeholder:text-gray-1 placeholder:text-base placeholder:leading-normal border-none rounded-[6px] focus-visible:ring-orange-1"
          rows={10}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button type="submit" onClick={generatePodcast} className="text-white-1 bg-orange-1 text-base font-bold leading-normal py-4 cursor-pointer">
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin" />
            </>
          ) : "Generate"}
        </Button>

        {audio && (
          <audio
           src={audio}
           controls
           autoPlay
           className="mt-5"
           onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          />
        )}
      </div>
    </div>
  )
}

export default GeneratePodcast;
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";

function GenerateThumbnail({
  setImage, setImageStorageId, image, imagePrompt, setImagePrompt
}: GenerateThumbnailProps) {
  const [isAIThumbnail, setIsAIThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  function generateImage() {

  }

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant={"plain"}
          onClick={() => setIsAIThumbnail(true)}
          className={cn("cursor-pointer", { "bg-black-6": isAIThumbnail })}
        >
          Use AI to generate thumbnail
        </Button>
        
        <Button
          type="button"
          variant={"plain"}
          onClick={() => setIsAIThumbnail(false)}
          className={cn("cursor-pointer", { "bg-black-6": !isAIThumbnail })}
        >
          Upload custom image
        </Button>
      </div>

      {isAIThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-white-1 text-base font-bold leading-normal">
              AI Prompt to generate thumbnail
            </Label>

            <Textarea
              className="text-gray-1 bg-black-1 text-base font-light leading-normal placeholder:text-gray-1 placeholder:text-base placeholder:leading-normal border-none rounded-[6px] focus-visible:ring-orange-1"
              placeholder="Provide text to generate thumbnail"
              rows={10}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button type="submit" onClick={generateImage} className="text-white-1 bg-orange-1 text-base font-bold leading-normal py-4 cursor-pointer">
              {isGenerating ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin" />
                </>
              ) : "Generate"}
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default GenerateThumbnail;
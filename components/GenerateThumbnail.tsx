import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { isStorageId } from "@/types/type-guards";
import { v4 as uuidv4 } from "uuid";

function GenerateThumbnail({
  setImage, setImageStorageId, image, imagePrompt, setImagePrompt
}: GenerateThumbnailProps) {
  const [isAIThumbnail, setIsAIThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction); 
  const getImageUrl = useMutation(api.podcasts.getURL);

  async function generateImage() {
    try {
      const buffer = await handleGenerateThumbnail({ input: imagePrompt });
      const blob = new Blob([buffer], { type: "image/png" });
      const fileName = `thumbnail-${uuidv4()}.png`;
      handleImage(blob, fileName);
    } catch(error) {
      console.log(error);
      toast("Error generating thumbnail");
    }
  }

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (files === null) return;

      const file = files[0];
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: "image/png" });
      handleImage(blob, file.name)
    } catch (error) {
      toast("Error uploading thumbnail");
      console.log(error)
    }
  }

  async function handleImage(blob: Blob, fileName: string) {
    setIsImageLoading(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });
      const uploaded = await startUpload([file]);
      const uploadResponse = uploaded[0].response;

      if (uploadResponse === null || typeof uploadResponse !== "object" || !("storageId" in uploadResponse)) {
        throw new Error("storageId doesn't exist in uploadResponse");
      }

      const { storageId } = uploadResponse;

      if (!isStorageId(storageId)) {
        throw new Error("storageId isn't a string!");
      }

      setImageStorageId(storageId);
      const imageURL = await getImageUrl({ storageId });
      
      if (!imageURL) {
        throw new Error("Thumbnail is not found");
      }

      setImage(imageURL);
      toast("Thumbnail generated successfully!")
    } catch (error) {
      console.log(error);
      toast("Error generating thumbnail")
    } finally {
      setIsImageLoading(false);
    }
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
            <Button onClick={generateImage} className="text-white-1 bg-orange-1 text-base font-bold leading-normal py-4 cursor-pointer">
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin" />
                </>
              ) : "Generate"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef.current?.click()}>
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image src="/icons/upload-image.svg" alt="upload" width={40} height={40} />
          ) : (
            <div className="text-white-1 text-base font-normal leading-normal flex-center">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-orange-1 text-12 font-bold">Click to upload</h2>
            <p className="text-gray-1 text-12 font-normal">SVG, PNG, JPG, or GIF (max. 1080x1080px)</p>
          </div>
        </div>
      )}

      {image && (
        <div className="flex-center w-full">
          <Image src={image} alt="thumbnail" width={200} height={200} className="mt-5" />
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail;
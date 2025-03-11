import { PodcastCardProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PodcastCard({ podcastId, title, imgURL, description,}: PodcastCardProps) {
  const router = useRouter();

  function handleViews() {
    // TODO: increase views

    // TODO: fix "localhost redirected you too many times" when not authenticated
    router.push(`/podcasts/${podcastId}`, { scroll: true });
  }

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgURL}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-white-1 text-16 font-bold truncate">{ title }</h1>
          <h2 className="text-white-4 text-12 font-normal truncate capitalize">{ description }</h2>
        </div>
      </figure>
    </div>
  )
}

export default PodcastCard;
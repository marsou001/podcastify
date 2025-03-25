"use client";

import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import PodcastDetailsPlayer from "./PodcastDetailsPlayer";
import LoaderSpinner from "./LoaderSpinner";
import { useUser } from "@clerk/nextjs";
import SimilarPodcasts from "./SimilarPodcasts";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";

function PodcastDetails({ podcastId }: { podcastId: Id<"podcasts"> }) {
  const [isOwner, setIsOwner] = useState(false);
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  const { user } = useUser();

  useEffect(() => {
    if (podcast === undefined || podcast === null) return;
    setIsOwner(user?.id === podcast?.authorId)
  }, [podcast]);

  if (podcast === undefined) return <LoaderSpinner />
  if (podcast === null) return <div className="mt-20"><EmptyState title="Podcast not found" /></div>

  return (
    <section className="flex w-full flex-col">
      <header className="flex justify-between items-center mt-9">
        <h1 className="text-white-1 text-[20px] font-bold leading-normal">Currently playing</h1>

        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" alt="headphone" width={24} height={24} />
          <h2 className="text-white-1 text-base font-bold leading-normal">{ podcast.views}</h2>
        </figure>
      </header>

      <PodcastDetailsPlayer isOwner={isOwner} podcastId={podcast._id} {...podcast} />

      <p className="text-white-2 text-base font-medium leading-normal pt-[45px] pb-8 max-md:text-center">{ podcast.podcastDescription }</p>
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-white-1 text-[18px] font-bold leading-normal">Transcription</h1>
          <p className="text-white-2 text-base font-medium leading-normal">{ podcast.voicePrompt }</p>
        </div>
      
        {podcast.imagePrompt !== undefined && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-white-1 text-[18px] font-bold leading-normal">Thumbnail prompt</h1>
              <p className="text-white-2 text-base font-medium leading-normal">{ podcast.imagePrompt }</p>
            </div>
          </div>
        )}

        <SimilarPodcasts podcastId={podcastId} />
      </div>
    </section>
  )
}

export default PodcastDetails;
"use client";

import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import PodcastDetailsPlayer from "./PodcastDetailsPlayer";
import LoaderSpinner from "./LoaderSpinner";
import PodcastCard from "./PodcastCard";
import EmptyState from "./EmptyState";

function PodcastDetails({ podcastId }: { podcastId: Id<"podcasts"> }) {
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId });

  // if (podcast === null) return <div>No podcast with the specific id was found</div>
  
  if (podcast === undefined || similarPodcasts === undefined) return <LoaderSpinner />

  return (
    <section className="flex w-full flex-col">
      <header className="flex justify-between items-center mt-9">
        <h1 className="text-white-1 text-[20px] font-bold leading-normal">Currently playing</h1>

        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" alt="headphone" width={24} height={24} />
          <h2 className="text-white-1 text-base font-bold leading-normal">{ podcast?.views}</h2>
        </figure>
      </header>

      <PodcastDetailsPlayer />

      <p className="text-white-2 text-base font-medium leading-normal pt-[45px] pb-8 max-md:text-center">{ podcast?.podcastDescription }</p>
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-white-1 text-[18px] font-bold leading-normal">Transcription</h1>
          <p className="text-white-2 text-base font-medium leading-normal">{ podcast?.voicePrompt }</p>
        </div>
      
        {podcast?.imagePrompt && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-white-1 text-[18px] font-bold leading-normal">Thumbnail prompt</h1>
              <p className="text-white-2 text-base font-medium leading-normal">{ podcast?.imagePrompt }</p>
            </div>
          </div>
        )}

        <section className="flex flex-col gap-5">
          <h1 className="text-white-1 text-[20px] font-bold">Similar podcasts</h1>
          {similarPodcasts.length > 0 ? (
            <div className="podcast_grid">
              {similarPodcasts?.map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  podcastId={podcast._id}
                  title={podcast.podcastTitle}
                  imgURL={podcast.imageURL}
                  description={podcast.podcastDescription}
                />
              ))}
            </div>
          ) : (
            <>
              <EmptyState
                title="No similar podcasts were found"
                link={{ buttonLink: "/discover", buttonText: "Discover more podcasts"}}
              /> 
            </>
          )}
        </section>
      </div>
    </section>
  )
}

export default PodcastDetails;
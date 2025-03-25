import PodcastCard from "./PodcastCard";
import EmptyState from "./EmptyState";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "./LoaderSpinner";

function SimilarPodcasts({ podcastId }: { podcastId: Id<"podcasts"> }) {
  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId });

  if (similarPodcasts === undefined) return <LoaderSpinner />
  
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-white-1 text-[20px] font-bold">Similar podcasts</h1>
      {similarPodcasts.length > 0 ? (
        <div className="podcast_grid">
          {similarPodcasts.map((podcast) => (
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
  )
}

export default SimilarPodcasts;
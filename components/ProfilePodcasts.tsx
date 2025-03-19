import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "./LoaderSpinner";
import PodcastCard from "./PodcastCard";
import EmptyState from "./EmptyState";

function ProfilePodcasts({ authorId}: { authorId: string }) {
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId });
  if (podcastsData === undefined) return <LoaderSpinner />
    
  const podcasts = podcastsData.podcasts;
  
  return (
    <section>
      <header className="mt-9">
        <h1 className="text-white-1 text-[20px] font-bold leading-normal">All Podcasts</h1>
      </header>

      <div className="flex flex-col gap-9 mt-6">
        {podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcasts.map((podcast) => (
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
          <EmptyState title="No results found" />
        )}
      </div>
    </section>
  )
}

export default ProfilePodcasts;
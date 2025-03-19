import { Dispatch, SetStateAction, useEffect } from "react";
import { AudioProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "./LoaderSpinner";
import PodcastCard from "./PodcastCard";
import EmptyState from "./EmptyState";

export type ProfilePodcastsProps = {
  authorId: string;
  setRandomPodcast: Dispatch<SetStateAction<AudioProps>>;
}

function ProfilePodcasts({ authorId, setRandomPodcast }: ProfilePodcastsProps) {
  const { user } = useUser();
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId });

  const isUserAuthor = user?.id === authorId;

  const podcasts = podcastsData?.podcasts!;
  
  useEffect(() => {
    if (podcastsData === undefined) return;

    const ran = Math.floor(Math.random() * podcasts.length)
    const randomPodcast = podcasts[ran];
    
    setRandomPodcast({
      podcastId: randomPodcast._id,
      author: randomPodcast.author,
      title: randomPodcast.podcastTitle,
      audioURL: randomPodcast.audioURL,
      imageURL: randomPodcast.imageURL,
    });
  }, [podcastsData]);
  
  if (podcastsData === undefined) return <LoaderSpinner />

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
          <>
            {isUserAuthor ? (
              <EmptyState title="You have not created any podcasts yet" link={{ buttonLink: "/create-podcast", buttonText: "Create a Podcast" }} />
            ) : (
              <EmptyState title="This podcaster has not created any podcasts yet" />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ProfilePodcasts;
import { PodcastProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import PodcastCard from "./PodcastCard";
import EmptyState from "./EmptyState";

export type ProfilePodcastsProps = {
  authorId: string;
  podcasts: PodcastProps[];
}

function ProfilePodcasts({ authorId, podcasts }: ProfilePodcastsProps) {
  const { user } = useUser();
  const isUserAuthor = user?.id === authorId;

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
                key={podcast.podcastId}
                podcastId={podcast.podcastId}
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
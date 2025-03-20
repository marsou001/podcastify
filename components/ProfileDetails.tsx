"use client"

import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AudioProps } from "@/types";
import { Loader } from "lucide-react";
import EmptyState from "./EmptyState";
import ProfileInfo from "./ProfileInfo";
import ProfilePodcasts from "./ProfilePodcasts";

function ProfileDetails({ profileId }: { profileId: string }) {
  const [randomPodcast, setRandomPodcast] = useState<AudioProps>({ podcastId: "", title: "", author: "", audioURL: "", imageURL: "" });
  const profile = useQuery(api.users.getUserByClerkId, { clerkId: profileId });
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: profileId });
  const podcasts = podcastsData?.podcasts!;
  const views = podcastsData?.listeners!;

  useEffect(() => {
    if (podcastsData === undefined) return;
    const randomPodcast = podcasts[Math.floor(Math.random() * podcasts.length)];
    setRandomPodcast({
      podcastId: randomPodcast._id,
      author: randomPodcast.author,
      title: randomPodcast.podcastTitle,
      audioURL: randomPodcast.audioURL,
      imageURL: randomPodcast.imageURL,
    });
  }, [podcastsData]);
  
  if (profile === undefined || podcastsData === undefined) return <Loader size={20} className="animate-spin" />
  if (profile === null) return <EmptyState title="Profile not found" />
  
  return (
    <div>
      <ProfileInfo name={profile.name} imageURL={profile.imageURL} randomPodcast={randomPodcast} views={views} />
      <ProfilePodcasts authorId={profile.clerkId} podcasts={podcasts} />
    </div>
  )
}

export default ProfileDetails;
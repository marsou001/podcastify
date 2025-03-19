"use client"

import { useState } from "react";
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
  
  if (profile === undefined) return <Loader size={20} className="animate-spin" />
  if (profile === null) return <EmptyState title="Profile not found" />
  
  return (
    <div>
      <ProfileInfo name={profile.name} imageURL={profile.imageURL} randomPodcast={randomPodcast} />
      <ProfilePodcasts authorId={profile.clerkId} setRandomPodcast={setRandomPodcast} />
    </div>
  )
}

export default ProfileDetails;
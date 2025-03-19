"use client"

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import EmptyState from "./EmptyState";
import ProfileInfo from "./ProfileInfo";
import ProfilePodcasts from "./ProfilePodcasts";

function ProfileDetails({ profileId }: { profileId: string }) {
  const profile = useQuery(api.users.getUserByClerkId, { clerkId: profileId });
  
  if (profile === undefined) return  <Loader size={20} className="animate-spin" />
  if (profile === null) return  <EmptyState title="Profile not found" />
  
  return (
    <div>
      <ProfileInfo name={profile.name} imageURL={profile.imageURL} />
      <ProfilePodcasts authorId={profile.clerkId} />
    </div>
  )
}

export default ProfileDetails;
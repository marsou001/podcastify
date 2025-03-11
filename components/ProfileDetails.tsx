"use client"

import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import EmptyState from "./EmptyState";
import { Button } from "./ui/button";

function ProfileDetails({ profileId }: { profileId: string }) {
  console.log(profileId)
  const profile = useQuery(api.users.getUserByClerkId, { clerkId: profileId });

  if (profile === undefined) return  <Loader size={20} className="animate-spin" />
  if (profile === null) return  <EmptyState title="Profile not found" />
  
  function playRandomPodcast() {
    console.log(222)
  }

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9">
        <h1 className="text-white-1 text-[20px] font-bold leading-normal">Podcaster Profile</h1>
      </header>

      <div className="mt-6 flex w-full justify-between max-md:justify-center">
        <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
          <Image
            src={profile.imageURL}
            width={350}
            height={350}
            alt="Podcast image"
            className="aspect-square rounded-lg"
          />
          <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
            <article className="flex flex-col gap-2 max-md:items-center">
              <h1 className="text-[32px] font-extrabold tracking-[-0.32px] text-white-1">
                {profile.name}
              </h1>
              <figure className="flex gap-3">
                <Image src="/icons/headphone.svg" alt="headphone" width={24} height={24} />
                <h2 className="text-white-3 text-sm">
                  <span className="text-white-1 text-base font-bold">93000000</span> monthly listeners
                </h2>
              </figure>
            </article>

            <Button
              onClick={playRandomPodcast}
              className="text-base w-full max-w-[350px] bg-orange-1 font-extrabold text-white-1"
            >
              <Image
                src="/icons/Play.svg"
                width={20}
                height={20}
                alt="random play"
              />
              &nbsp; Play a random podcast
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileDetails;
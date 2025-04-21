"use client"

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./Carousel";
import Header from "./Header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { formatNumberOfPodcasts } from "@/lib/utils";

function RightSideBar() {
  const router = useRouter();
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  const name = user?.firstName + " " + user?.lastName;

  return (
    <div className="right_sidebar text-white-1">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex justify-between items-center w-full">
            <h1 className="text-white-1 text-base font-semibold truncate">{ name }</h1>
            <Image src="/icons/right-arrow.svg" alt="arrow" width={24} height={24} />
          </div>
        </Link>
      </SignedIn>

      <section>
        <Header headerTitle="Fans Like You" />
        {topPodcasters && <Carousel fansLikeDetail={topPodcasters} />}
      </section>
      
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcastrs" />
        <div className="flex flex-col gap-6">
          {topPodcasters && topPodcasters.slice(0, 5).map((podcaster) => (
            <div
              key={podcaster._id}
              className="cursor-pointer flex justify-between items-center"
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className="flex items-center gap-2">
                <Image src={podcaster.imageURL} alt={podcaster.name} width={44} height={44} className="aspect-square rounded-lg" />
                <h2 className="text-white-1 text-[14px] font-semibold truncate w-[128px]">{ podcaster.name }</h2>
              </figure>
              
              <div className="text-center">
                <p className="text-[12px] font-normal">{ formatNumberOfPodcasts(podcaster.totalPodcasts) }</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RightSideBar;
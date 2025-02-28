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

  const name = (user?.firstName && user?.lastName) ? `${user?.firstName} ${user?.lastName}` : user?.emailAddresses[0].emailAddress;

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
          {topPodcasters && topPodcasters.slice(0, 5).map((podcastr) => (
            <div
              key={podcastr._id}
              className="cursor-pointer flex justify-between items-center"
              onClick={() => router.push(`/profile/${podcastr._id}`)}
            >
              <figure className="flex items-center gap-2">
                <Image src={podcastr.imageURL} alt={podcastr.name} width={44} height={44} className="aspect-square rounded-lg" />
                <h2 className="text-white-1 text-[14px] font-semibold truncate w-[128px]">{ podcastr.name }</h2>
              </figure>
              
              <div className="text-center">
                <p className="text-[12px] font-normal">{ formatNumberOfPodcasts(podcastr.totalPodcasts) }</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RightSideBar;
"use client"

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./Carousel";
import Header from "./Header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function RightSideBar() {
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
    </div>
  )
}

export default RightSideBar;
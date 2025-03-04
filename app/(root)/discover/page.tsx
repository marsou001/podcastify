"use client"

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import SearchBar from "@/components/SearchBar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

function Discover() {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: "" })

  return (
    <div className="flex flex-col gap-9">
      <SearchBar />
      
      <div className="flex flex-col gap-9">
        <h1 className="text-white-1 text-[20px] font-bold">Discover</h1>
        {podcastsData === undefined ? (
          <LoaderSpinner />
        ) : (
            <>
              {podcastsData.length > 0 ? (
                <div className="podcast_grid">
                {podcastsData.map((podcast) => (
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
            </>
          )
        }
      </div>
    </div>
  )
}

export default Discover;
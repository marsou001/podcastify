
/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

export type VoiceType = SpeechCreateParams["voice"];

export type EmptyStateProps = {
  title: string;
  search?: boolean;
  link?: EmptyStateLink;
}

export type TopPodcastersProps = {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageURL: string;
  clerkId: string;
  name: string;
  podcast: {
    podcastTitle: string;
    podcastId: Id<"podcasts">;
  }[];
  totalPodcasts: number;
}

export type PodcastProps = {
  _id: Id<"podcasts">;
  _creationTime: number;
  audioStorageId: Id<"_storage"> | null;
  user: Id<"users">;
  podcastTitle: string;
  podcastDescription: string;
  audioURL: string | null;
  imageURL: string | null;
  imageStorageId: Id<"_storage"> | null;
  author: string;
  authorId: string;
  authorImageURL: string;
  voicePrompt: string;
  imagePrompt: string | null;
  voiceType: VoiceType;
  audioDuration: number;
  views: number;
}

export type ProfilePodcastProps = {
  podcasts: PodcastProps[];
  listeners: number;
}

export type GeneratePodcastProps = {
  voiceType: VoiceType;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export type GenerateThumbnailProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

export type LatestPodcastCardProps = {
  imgURL: string;
  title: string;
  duration: string;
  index: number;
  audioURL: string;
  author: string;
  views: number;
  podcastId: Id<"podcasts">;
}

export type PodcastDetailPlayerProps = {
  audioURL: string;
  podcastTitle: string;
  author: string;
  isOwner: boolean;
  imageURL: string;
  podcastId: Id<"podcasts">;
  imageStorageId: Id<"_storage">;
  audioStorageId: Id<"_storage">;
  authorImageURL: string;
  authorId: string;
}

export type AudioProps = {
  title: string;
  audioURL: string;
  author: string;
  imageURL: string;
  podcastId: string;
}

export type AudioContextType = {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export type PodcastCardProps = {
  imgURL: string;
  title: string;
  description: string;
  podcastId: Id<"podcasts">;
}

export type CarouselProps = {
  fansLikeDetail: TopPodcastersProps[];
}

export type ProfileCardProps = {
  podcastData: ProfilePodcastProps;
  imageURL: string;
  userFirstName: string;
}

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

type EmptyStateLink = {
  buttonLink: string;
  buttonText: string;
}
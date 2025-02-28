import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberOfPodcasts(numberOfPodcasts: number): `${number} podcast` | `${number} podcasts` {
  if (numberOfPodcasts === 1) return `${numberOfPodcasts} podcast`
  return `${numberOfPodcasts} podcasts`
}
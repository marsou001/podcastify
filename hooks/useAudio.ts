"use client";

import { useContext } from "react";
import { AudioContext } from "@/app/providers/AudioProvider";

function useAudio() {
  const context = useContext(AudioContext);
  if (context === null) throw new Error("useAudio must be used within an AudioProvider!");
  return context;
}

export default useAudio;
"use client"

import { AudioContextType, AudioProps } from "@/types";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AudioContext = createContext<AudioContextType | null>(null);

function AudioProvider({ children }: { children: ReactNode}) {
  const [audio, setAudio] = useState<AudioProps | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/create-podcast") setAudio(null);
  }, [pathname])

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioProvider;
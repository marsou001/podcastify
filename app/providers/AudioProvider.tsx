"use client"

import { AudioContextType } from "@/types";
import { createContext } from "react";

const audioContext = createContext<AudioContextType | undefined>(undefined);

function AudioProvider() {
  return (
    <div></div>
  )
}

export default AudioProvider;
"use client"

import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative block mt-8">
      <Input
        placeholder="Search for podcasts"
        className="input-class py-6 pl-12 focus-visible:ring-orange-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image src="/icons/search.svg" alt="search" width={20} height={20} className="absolute top-3.5 left-4" />
    </div>
  )
}

export default SearchBar;
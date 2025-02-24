"use client"

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function LeftSideBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-1 pb-10 max-lg:justify-center cursor-pointer">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">Podcastr</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = item.route === pathname || pathname.startsWith(item.route + "/");

          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("flex justify-center lg:justify-start items-center gap-3 py-4 max-lg:px-4", {
                "bg-nav-focus border-r-4 border-orange-1": isActive
              })}
            >
              <Image src={item.imgURL} alt={item.label} width={24} height={24} />
              <span>{ item.label }</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default LeftSideBar;
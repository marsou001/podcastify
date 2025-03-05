"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNav() {
  const pathname = usePathname();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" alt="menu" width={30} height={30} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <SheetTitle>Menu</SheetTitle>
          
          <Link href="/" className="flex items-center gap-1 pb-10 pl-4 cursor-pointer">
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">Podcastr</h1>
          </Link>

          <div className="overflow-y-auto flex flex-col justify-between h-calc[100vh-72px]">
            <SheetClose asChild>
              <nav className="text-white-1 flex flex-col gap-6 h-full">
                {sidebarLinks.map((item) => {
                  const isActive = item.route === pathname || pathname.startsWith(item.route + "/");

                  return (
                    <SheetClose key={item.label} asChild>
                      <Link
                        href={item.route}
                        className={cn("flex justify-start items-center gap-3 py-4 max-lg:px-4", {
                          "bg-nav-focus border-r-4 border-orange-1": isActive
                        })}
                      >
                        <Image src={item.imgURL} alt={item.label} width={24} height={24} />
                        <span>{ item.label }</span>
                      </Link>
                    </SheetClose>
                    )
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav;
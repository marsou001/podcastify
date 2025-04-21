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
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

function MobileNav() {
  const pathname = usePathname();
  const { user } = useUser();

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

          <div className="relative flex flex-col justify-between h-screen">
            <SheetClose asChild>
              <div>
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

                <SignedOut>
                  <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                    <Button asChild className="text-white-1 bg-orange-1 text-base font-extrabold w-full cursor-pointer">
                      <Link href="/sign-in">Sign-in</Link>
                    </Button>
                  </div>
                </SignedOut>
                
                <SignedIn>
                  <Link href={`/profile/${user?.id}`} className="absolute bottom-12 flex gap-3 w-full px-4">
                    <UserButton appearance={{ elements: { userButtonPopoverCard: { pointerEvents: "initial" } }}} />
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-white-1 text-base font-semibold truncate">{ user?.fullName }</h1>
                      <Image src="/icons/right-arrow.svg" alt="arrow" width={24} height={24} />
                    </div>
                  </Link>
                </SignedIn>
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav;
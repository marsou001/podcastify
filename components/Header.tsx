import { cn } from "@/lib/utils";
import { HeaderProps } from "@/types";
import Link from "next/link";

function Header({ headerTitle, titleClassName }: HeaderProps) {
  return (
    <header className="flex justify-between items-center">
      {headerTitle ? (
        <h1 className={cn("text-white-1 text-[18px] font-bold", titleClassName)}>{ headerTitle }</h1>
      ) : <div />}
      
      <Link href="/discover" className="text-orange-1 text-base font-semibold">See all</Link>
    </header>
  )
}

export default Header;
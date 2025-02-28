import { EmptyStateProps } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

function EmptyState({ title, search, link }: EmptyStateProps) {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image src="/icons/emptyState.svg" alt="empty state" width={250} height={250} />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-white-1 text-base font-medium leading-normal text-center">{ title }</h1>

        {search && (
          <p className="text-white-2 text-base font-medium leading-normal text-center">Try adjusting your search to find what you are looing for</p>
        )}
        
        {link && (
          <Button className="bg-orange-1">
            <Link href={link.buttonLink} className="flex gap-1">
              <Image src="/icons/discover.svg" alt="discover" width={20} height={20} />
              <h1 className="text-white-1 text-base font-extrabold leading-normal">{ link.buttonText }</h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default EmptyState;
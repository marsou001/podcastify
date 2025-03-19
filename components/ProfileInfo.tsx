import Image from "next/image";
import { Button } from "./ui/button";

export type ProfileInfoProps = {
  name: string;
  imageURL: string;
}

function ProfileInfo({ name, imageURL }: ProfileInfoProps) {
  function playRandomPodcast() {
    console.log(222)
  }

  return (
    <section>
      <header className="mt-9">
        <h1 className="text-white-1 text-[20px] font-bold leading-normal">Podcaster Profile</h1>
      </header>

      <div className="mt-6 flex w-full justify-between max-md:justify-center">
        <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
          <Image
            src={imageURL}
            width={250}
            height={250}
            alt="Podcast image"
            className="rounded-lg size-full"
          />
          
          <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
            <article className="flex flex-col gap-2 max-md:items-center">
              <h1 className="text-[32px] font-extrabold tracking-[-0.32px] text-white-1">
                {name}
              </h1>
              <figure className="flex gap-3">
                <Image src="/icons/headphone.svg" alt="headphone" width={24} height={24} />
                <h2 className="text-white-3 text-sm">
                  <span className="text-white-1 text-base font-bold">93000000</span> monthly listeners
                </h2>
              </figure>
            </article>

            <Button
              onClick={playRandomPodcast}
              className="text-base w-full max-w-[350px] bg-orange-1 font-extrabold text-white-1"
            >
              <Image
                src="/icons/Play.svg"
                width={20}
                height={20}
                alt="random play"
              />
              &nbsp; Play a random podcast
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileInfo;
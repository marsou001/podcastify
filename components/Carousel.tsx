import React, { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselProps } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function EmblaCarousel({ fansLikeDetail }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const router = useRouter();

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const slides = fansLikeDetail.filter((item) => item.totalPodcasts > 0);

  return (
    <section className="overflow-hidden flex flex-col gap-4 w-full" ref={emblaRef}>
      <div className="flex">
        {slides.slice(0, 5).map((slide) => (
          <figure
            key={slide._id}
            className="carousel_box"
            onClick={() => router.push(`/podcasts/${slide.podcast[0].podcastId}`)}
          >
            <Image src={slide.imageURL} alt="card" fill className="absolute size-full rounded-xl border-none" />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-white-1 text-[14px] font-semibold">{slide.podcast[0].podcastTitle}</h2>
              <p className="text-white-2 text-[12px] font-normal">{slide.name}</p>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  )
}

export default EmblaCarousel
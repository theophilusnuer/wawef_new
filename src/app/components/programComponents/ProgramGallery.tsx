"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { FullProgram } from "@/sanity/lib/getProgramBySlug";

interface ProgramGalleryProps {
  program: Pick<FullProgram, "impactGallery">;
}

export default function ProgramGallery({ program }: ProgramGalleryProps) {
  const galleryImages = program.impactGallery || [];
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft - 8);
  };

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const scrollAmount = Math.max(rail.clientWidth * 0.85, 280);
    rail.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    updateScrollState();

    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [galleryImages.length]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <section className="pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
            Program Gallery
            <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
          </h2>
        </div>

        <div className="relative group">
          <div
            ref={railRef}
            className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Program gallery carousel"
          >
            {galleryImages.map((item, i) => (
              <article
                key={i}
                className="group/card relative shrink-0 basis-[90%] sm:basis-[48%] md:basis-[34%] lg:basis-[25%] xl:basis-[19%] snap-start"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(700).height(560).fit("crop").url()}
                    alt={item.image?.alt || `Program image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <p className="absolute bottom-1 left-2 italic text-white text-sm tracking-wide">
                     {i + 1}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollRail("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll gallery left"
            className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white text-2xl leading-none transition hover:bg-black/80 disabled:opacity-0 disabled:pointer-events-none"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={() => scrollRail("right")}
            disabled={!canScrollRight}
            aria-label="Scroll gallery right"
            className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white text-2xl leading-none transition hover:bg-black/80 disabled:opacity-0 disabled:pointer-events-none"
          >
            &#8250;
          </button>

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/50 via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition md:block hidden" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/50 via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition md:block hidden" />
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { FullProgram } from "@/sanity/lib/getProgramBySlug";

interface ProgramHeroProps {
  program: Pick<
    FullProgram,
    "programName" | "coverImage" | "youtubeLink" | "location"
  >;
}

const ProgramHero: React.FC<ProgramHeroProps> = ({ program }) => {
  const playerRef = useRef<any>(null);

  // Show YouTube video whenever youtubeLink exists
  useEffect(() => {
    if (!program.youtubeLink) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);

    const videoIdMatch = program.youtubeLink.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : "";

    if (!videoId) return;

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [program.youtubeLink]);

  const hasVideo = !!program.youtubeLink;

  return (
    <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[80vh] overflow-hidden">
      {/* Background Cover Image */}
      {program.coverImage && (
        <Image
          src={urlFor(program.coverImage)
            .width(1920)
            .height(1080)
            .fit("crop")
            .url()}
          alt={program.coverImage.alt || program.programName}
          fill
          priority
          className="object-cover object-center brightness-[0.75]"
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[85vh] px-5 sm:px-8 md:px-12 py-12 md:py-16 lg:py-20 text-center text-white">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg mb-6 md:mb-8">
          {program.programName}
        </h1>

        {/* Location (if available) */}
        {program.location && (
          <div className="inline-flex items-center p-2.5 text-base md:text-lg font-medium bg-white/20 backdrop-blur-sm rounded-md border border-white/30 mb-8">
            <span className="mr-1">📍</span>
            {program.location}
          </div>
        )}

        {/* YouTube Video - Integrated in Hero */}
        {hasVideo && (
          <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12">
            <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/20">
              <div id="youtube-player" className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramHero;
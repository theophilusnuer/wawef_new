'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import PadDonation from './PadDonation';
import phero from "../../assets/images/phero.webp"
// Load YouTube IFrame API dynamically
const loadYouTubeIframeAPI = () => {
  if (!document.getElementById('youtube-iframe-api')) {
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }
};

const PadAGirlHero: React.FC = () => {
  useEffect(() => {
    loadYouTubeIframeAPI();

    const onYouTubeIframeAPIReady = () => {
      new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: 'rnfftcd8--k', 
        playerVars: {
          autoplay: 0,
          controls: 1, 
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    if ((window as any).YT && (window as any).YT.loaded) {
      onYouTubeIframeAPIReady();
    } else {
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      // Cleanup not needed since player is not stored in ref
    };
  }, []);

  return (
    <section className="relative w-full h-[65vh] md:h-[85vh] lg:h-[85vh] overflow-hidden">
      <div className="relative w-full h-[52vh] md:h-[60vh] lg:h-[70vh]">
        {/* Optimized Background Image with Next/Image */}
        <Image
          src={phero}
          alt="Pad A Girl hero background"
          fill
          priority 
          sizes="100vw" 
          className="object-cover object-center" 
          style={{ objectFit: 'cover' }} 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="relative z-10 flex items-start justify-center text-center px-4 sm:px-6 md:px-8 pt-10 md:pt-14 lg:pt-16 min-h-[40vh] max-h-[50vh]">
          <div className="">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              PadHer SheFlow Campaign
            </h1>
            {/* <div className="w-full flex items-center justify-center px-4 py-2">
              <PadDonation width="w-full" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Floating YouTube Video */}
      <div className="absolute shadow-xl bottom-0 left-1/2 transform xl:translate-y-16 2xl:translate-y-0 -translate-x-1/2 w-11/12 [@media(min-width:510px)]:w-9/12 sm:w-3/5 md:w-2/3 lg:w-1/2 max-w-3xl z-10">
        <div className="relative aspect-video">
          <div id="youtube-player" className="w-full h-full rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default PadAGirlHero;
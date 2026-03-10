"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProjectDonate from "./ProjectDonate";

interface ProjectHeroProps {
  project: {
    projectName: string;
    status: "upcoming" | "completed";
    coverImage?: any;
    donateLink?: string;
    about?: string;
    youtubeLink?: string;
    location?: string; 
  };
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (project.status !== "completed" || !project.youtubeLink) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);

    // Extract YouTube video ID safely
    const videoIdMatch = project.youtubeLink.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/,
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
          showinfo: 0,
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
  }, [project.status, project.youtubeLink]);

  const isUpcoming = project.status === "upcoming";
  const hasVideo = project.status === "completed" && project.youtubeLink;

  return (
    <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      {project.coverImage && (
        <Image
          src={urlFor(project.coverImage)
            .width(1920)
            .height(1080)
            .fit("crop")
            .url()}
          alt={project.coverImage.alt || project.projectName}
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
          {project.projectName}
        </h1>

        {/* Conditional Badge / Donate Area */}
        <div className="mb-8 md:mb-10">
          {isUpcoming ? (
            <ProjectDonate
              projectName={project.projectName}
              donateLink={project.donateLink}
              
              width="w-64 mx-auto"
              buttonText="Donate Now"
            />
          ) : project.location ? (
            <div className="inline-flex items-center p-2.5 text-base md:text-lg font-medium bg-white/20 backdrop-blur-sm rounded-md border border-white/30">
              <span className="mr-1">📍</span>
              {project.location}
            </div>
          ) : null}
        </div>

        {/* Conditional Video / About Placeholder */}
        <div className="w-full max-w-3xl mx-auto mt-4 md:mt-8">
          {isUpcoming ? (
            // Upcoming: "What is this project?" in light background
            <div className="bg-[#FCFCF4] text-gray-900 rounded-md overflow-hidden shadow-2xl ring-1 ring-black/10 p-6 md:p-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
                What is {project.projectName}?
              </h3>
              <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                {project.about || "Project details coming soon."}
              </p>
            </div>
          ) : 
            // Completed with video
            <div className="relative aspect-video rounded-md overflow-hidden shadow-2xl ring-1 ring-white/20">
              <div id="youtube-player" className="absolute inset-0" />
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;

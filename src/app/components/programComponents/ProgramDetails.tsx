"use client";

import type { FullProgram } from "@/sanity/lib/getProgramBySlug";

interface ProgramDetailsProps {
  program: Pick<FullProgram, "programName" | "overview" | "youtubeLink">;
}



export default function ProgramDetails({ program }: ProgramDetailsProps) {

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
              Program Details
              <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
            </h2>
          </div>

          {program.overview && (
            <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {program.overview}
            </p>
          )}
        </div>
      </section>

    </>
  );
}

// src/components/ProjectOverview.tsx
"use client";

import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image"; // for optimized Sanity images
import type { FullProject } from "@/sanity/lib/getProjectBySlug";

interface ProjectOverviewProps {
  project: FullProject;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  // Choose the right overview text based on status
  const overviewText =
    project.status === "completed"
      ? project.overview
      : // For upcoming: combine about/problem/solution if no single overview
        [
          project.about && `About: ${project.about}`,
          project.problem && `The Problem: ${project.problem}`,
          project.solution && `Solution: ${project.solution}`,
        ]
          .filter(Boolean)
          .join("\n\n") || "Project overview coming soon.";

  // Partners array (from schema)
  const partners = project.partners || [];

  // Report download URL
  const reportUrl = project.projectReport?.asset?.url;
  const reportFilename = project.projectReport?.asset?.originalFilename || "project-report.pdf";

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT SIDE – Overview + Download */}
          <div className="md:col-span-2 space-y-8 md:space-y-10">
            {/* Project Overview */}
            <div>
              <h2 className="inline-block text-base md:text-2xl px-3 py-2 md:px-4 md:py-3 rounded-sm bg-[#FAEBE7] mb-6 md:mb-8">
                Project Overview
              </h2>
              <p className="text-justify leading-relaxed text-gray-700 text-base md:text-lg whitespace-pre-line">
                {overviewText}
              </p>
            </div>

            {/* Download Report – only show if exists */}
            {reportUrl && (
              <div className="flex items-center space-x-3">
                <p className="text-gray-700 italic underline underline-offset-4">
                  Download full report
                </p>
                <a
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={reportFilename}
                  className="flex items-center gap-1.5 text-[#F2C94C] font-semibold text-sm sm:text-base hover:text-[#e0b53a] transition-colors"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  PDF
                </a>
              </div>
            )}
          </div>

          {/* RIGHT SIDE – Project Partners */}
          {partners.length > 0 && (
            <div className="space-y-6 bg-[#FCF2EF] p-6 md:p-8 rounded-md">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
                Project Partners
              </h2>

              <div className="flex flex-col gap-6 md:gap-8">
                {partners.map((partner, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {partner.logo?.asset?.url && (
                      <div className="mb-3">
                        <Image
                          src={urlFor(partner.logo).width(120).height(120).url()}
                          alt={partner.logo.alt || `${partner.name} logo`}
                          width={120}
                          height={120}
                          className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 object-contain"
                        />
                      </div>
                    )}

                    <Link
                      href={partner.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center max-w-[15rem] sm:max-w-[18rem]"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-medium underline hover:text-[#F2C94C] transition-colors">
                        {partner.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
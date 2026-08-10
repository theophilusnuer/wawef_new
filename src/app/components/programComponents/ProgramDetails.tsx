"use client";

import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <PortableText
              value={program.overview as any}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-2">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#F2C94C] pl-4 italic text-gray-600 my-6">{children}</blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ value, children }) => (
                    <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline text-[#8A6D1A] hover:opacity-80">
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700 text-base md:text-lg">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-1 text-gray-700 text-base md:text-lg">{children}</ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  number: ({ children }) => <li className="leading-relaxed">{children}</li>,
                },
                types: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  image: ({ value }: { value: any }) => {
                    if (!value?.asset?._ref) return null;
                    return (
                      <div className="my-4">
                        <Image
                          src={urlFor(value).width(1400).fit('max').quality(88).url()}
                          alt={value.alt || 'Program image'}
                          width={1400}
                          height={700}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </section>

    </>
  );
}

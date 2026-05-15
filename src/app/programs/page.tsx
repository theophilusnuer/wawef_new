import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  getProgramsList,
  type ProgramListItem,
} from "@/sanity/lib/getProgramsList";
import {
  getProgramBySlug,
  type FullProgram,
} from "@/sanity/lib/getProgramBySlug";
import pad3 from "../assets/images/pad3.webp";
import { urlFor } from "@/sanity/lib/image";
import { Quote3 } from "../components/homepage/Quotes";

export default async function ProgramsPage() {
  const programSlugs = await getProgramsList();

  const programs = await Promise.all(
    programSlugs.map(async (p: ProgramListItem) => {
      if (!p.slug?.current) return null;
      return await getProgramBySlug(p.slug.current);
    }),
  );

  const validPrograms = programs.filter((program): program is FullProgram =>
    Boolean(program),
  );

  return (
    <>
      <Head>
        <title>WAWEF Programs</title>
        <meta
          name="description"
          content="Explore WAWEF programs empowering women and communities across West Africa."
        />
      </Head>
{/* hero */}
      <div className="relative w-full h-[38vh] md:h-[70vh]">
		   {/* Background Image */}
		   <Image
			 src={pad3.src}
			 alt="#wawef"
			 fill={true}
			 className="object-cover object-top"
		   />
	 
		   {/* Black Overlay with 65% Opacity */}
		   <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex flex-col justify-end h-full p-8 w-full">
        <div className="container mx-auto sm:px-6 lg:px-8">
          <h3 className="text-white text-xl md:text-3xl xl:text-4xl mb-6">Explore our programs making a lasting impact</h3>
        </div>
      </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
              All Programs
              <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
            </h2>
          </div>{" "}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {validPrograms.map((program) => (
              <Link
                key={program._id}
                href={`/programs/${program.slug.current}`}
                className="group overflow-hidden transition-all duration-300 flex flex-col"
              >
                {program.coverImage?.asset?.url ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(program.coverImage)
                        .width(800)
                        .height(600)
                        .fit("crop")
                        .quality(85)
                        .url()}
                      alt={program.coverImage.alt || program.programName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No cover image
                  </div>
                )}

                <div className="py-4 text-left flex-grow flex ">
                  <h3 className="md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    <span className="inline-underline underline underline-offset-2 pb-1">
                      {program.programName}
                    </span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {validPrograms.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No programs found at the moment. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}

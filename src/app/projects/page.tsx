// src/app/projects/page.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectsList } from '@/sanity/lib/getProjectsList'; // we'll fix this next
import pad3 from '../assets/images/pad3.webp';
import { urlFor } from '@/sanity/lib/image';
import { getProjectBySlug } from '@/sanity/lib/getProjectBySlug'; // ← reuse this!
import { Quote3 } from '../components/homepage/Quotes';

export default async function ProjectsPage() {
  // Get slugs from the lightweight list
  const projectSlugs = await getProjectsList(); // returns only slugs + minimal data

  // Fetch full project data for each slug using the reliable function
  const projects = await Promise.all(
    projectSlugs.map(async (p: any) => {
      if (!p.slug?.current) return null;
      return await getProjectBySlug(p.slug.current);
    })
  );

  // Filter out nulls
  const validProjects = projects.filter(Boolean);

  return (
    <>
      <Head>
        <title>WAWEF Flagship Projects</title>
        <meta name="description" content="Explore WAWEF's flagship and completed projects empowering women and communities across West Africa." />
      </Head>

      {/* Hero – unchanged */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image src={pad3.src} alt="WAWEF Flagship Projects Hero" fill className="object-cover object-center brightness-75" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-end h-full pb-12 sm:pb-16 md:pb-20 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-2xl sm:text-5xl text-white font-bold tracking-tight drop-shadow-lg">
              Our Flagship Projects
            </h1>
            <p className="text-white text-sm sm:text-xl italic my-3">
              Explore our ongoing and completed projects making a lasting impact.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20">
        <p className="mb-10 md:mb-16">
          <Quote3 />
        </p>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {validProjects.map((project: any) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug?.current}`}
              className="group  rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col bg-white"
            >
              {/* Cover Image */}
              {project.coverImage?.asset?.url ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(project.coverImage).width(800).height(600).fit('crop').quality(85).url()}
                    alt={project.coverImage.alt || project.projectName}
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

              {/* Only project name below image */}
              <div className="p-5 md:p-6 text-center flex-grow flex items-center justify-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  <span className="inline- border-b-2 border-primary pb-1 group-hover:border-primary/80">
                    {project.projectName}
                  </span>
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {validProjects.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No projects found at the moment. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}
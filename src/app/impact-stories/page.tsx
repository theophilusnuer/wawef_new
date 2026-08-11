import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GiveMonthlyHero } from "../components/giveMonthly/GiveMonthlyHero";
import { urlFor } from "@/sanity/lib/image";
import {
  getImpactStoriesList,
  type ImpactStoryListItem,
} from "@/sanity/lib/getImpactStoriesList";

const formatStoryDate = (isoDate?: string) => {
  if (!isoDate) return "Date unavailable";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default async function ImpactStoriesPage() {
  const stories = await getImpactStoriesList();
  const validStories = stories.filter(
    (story): story is ImpactStoryListItem & { slug: { current: string } } =>
      Boolean(story.slug?.current),
  );

  return (
    <>
      <Head>
        <title>WAWEF Impact Stories</title>
        <meta
          name="description"
          content="Real stories of transformation and empowerment from WAWEF's work across West Africa."
        />
      </Head>

      <GiveMonthlyHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
            All Impact Stories
            <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
          </h2>
        </div>{" "}

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {validStories.map((story) => (
            <Link
              key={story._id}
              href={`/impact-stories/${story.slug.current}`}
                className="group overflow-hidden transition-all duration-300 flex flex-col"
            >
              {story.coverImage?.asset?._ref ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(story.coverImage)
                      .width(800)
                      .height(600)
                      .fit("crop")
                      .quality(85)
                      .url()}
                    alt={story.title}
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
                      {story.title}
                    </span>
                  </h3>
                </div>
            </Link>
          ))}
        </div>
        {validStories.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-lg">
            No impact stories available yet. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}

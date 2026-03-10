import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getNewsList, type NewsListItem } from "@/sanity/lib/getNewsList";
import { urlFor } from "@/sanity/lib/image";

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

export default async function NewsStoriesPage() {
	const newsStories = await getNewsList();
	const validNewsStories = newsStories.filter(
		(story): story is NewsListItem & { slug: { current: string } } =>
			Boolean(story.slug?.current),
	);

	return (
		<>
			<Head>
				<title>WAWEF News Stories</title>
				<meta
					name="description"
					content="Latest WAWEF news, stories, and updates from our programs and projects."
				/>
			</Head>

			<section className="w-full h-[20vh] sm:h-[26vh] lg:h-[34vh] bg-[#f5efe6] flex items-end">
				<div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
					<h1 className="text-3xl sm:text-5xl text-gray-900 font-bold tracking-tight">
						News Stories
					</h1>
					<p className="text-gray-700 text-sm sm:text-lg italic mt-2">
						Updates from WAWEF communities.
					</p>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 pt-10 sm:pt-12">
				<p className="text-left pb-6 text-2xl sm:text-4xl">All News</p>

				<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{validNewsStories.map((story) => (
						<Link
							key={story._id}
							href={`/news-stories/${story.slug.current}`}
							className="group rounded-sm overflow-hidden transition-all duration-300 flex flex-col"
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

							<div className="p-5 md:p-6 text-center flex-grow flex flex-col items-center justify-center">
								<h3 className="md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
									<span className="inline underline underline-offset-2 pb-1">
										{story.title}
									</span>
								</h3>
							</div>
						</Link>
					))}
				</div>

				{validNewsStories.length === 0 && (
					<p className="text-center text-gray-500 py-12 text-lg">
						No news stories available yet. Check back soon!
					</p>
				)}
			</div>
		</>
	);
}

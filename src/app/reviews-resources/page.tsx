import Head from "next/head";
import Image from "next/image";
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getResourcesList } from "@/sanity/lib/getResourcesList";
import { urlFor } from "@/sanity/lib/image";

const formatResourceDate = (isoDate?: string) => {
	if (!isoDate) return "Date unavailable";

	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return "Date unavailable";

	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

export default async function ReviewsResourcesPage() {
	const resources = await getResourcesList();

	return (
		<>
			<Head>
				<title>WAWEF Reviews & Resources</title>
				<meta
					name="description"
					content="Browse all WAWEF reports, reviews, and action plans."
				/>
			</Head>

			<section className="w-full h-[20vh] sm:h-[26vh] lg:h-[34vh] bg-[#f5efe6] flex items-end">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pb-4 sm:pb-8 md:pb-10">
          <h1 className="text-3xl sm:text-5xl text-gray-900 font-bold tracking-tight">
            Reviews & Resources
          </h1>
          <p className="text-gray-700 text-sm sm:text-lg italic mt-2">
            Reports, and action plans from WAWEF.
          </p>
        </div>
      </section>

			<section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 pt-10 sm:pt-12">
				<p className="text-left pb-6 text-2xl sm:text-4xl">All Uploaded Reports</p>

				<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{resources.map((resource) => {
						const fileUrl = resource.file?.asset?.url;
						const fileName = resource.file?.asset?.originalFilename || "resource-file";

						return (
							<article
								key={resource._id}
								className="rounded-sm border-1 overflow-hidden flex flex-col"
							>
								{resource.coverImage?.asset?._ref ? (
									<div className="relative aspect-[4/3] overflow-hidden">
										<Image
											src={urlFor(resource.coverImage)
												.width(900)
												.height(675)
												.fit("crop")
												.quality(85)
												.url()}
											alt={resource.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
									</div>
								) : (
									<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
										No cover image
									</div>
								)}

								<div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
									<p className="text-xs text-gray-500">{formatResourceDate(resource._createdAt)}</p>

									<h2 className="text-lg md:text-xl font-semibold text-gray-900">{resource.title}</h2>

									<p className="text-sm text-gray-700 leading-relaxed">
										{resource.summary || "No summary available."}
									</p>

									<div className="mt-auto pt-3 flex flex-wrap gap-3">
										{fileUrl && (
											<a
												href={fileUrl}
												target="_blank"
												rel="noopener noreferrer"
												download={fileName}
												className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-gray-950 transition-colors"
											>
												<ArrowDownTrayIcon className="h-[1.125rem] w-[1.125rem]" />
												Download file
											</a>
										)}

										{resource.externalLink && (
											<a
												href={resource.externalLink}
												target="_blank"
												rel="noopener noreferrer"
												className=" italic inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-gray-950 transition-colors"
											>
 												Check this out 
											</a>
										)}
									</div>
								</div>
							</article>
						);
					})}
				</div>

				{resources.length === 0 && (
					<p className="text-center text-gray-500 py-12 text-lg">
						No resources have been uploaded yet.
					</p>
				)}
			</section>
		</>
	);
}

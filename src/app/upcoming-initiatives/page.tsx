import Head from "next/head";
import Image from "next/image";
import { getUpcomingInitiativesList } from "@/sanity/lib/getUpcomingInitiativesList";
import { urlFor } from "@/sanity/lib/image";

const getInitials = (title: string) => {
	return title.trim().charAt(0).toUpperCase() || "I";
};

const formatLaunchDate = (month: string | undefined, year: number) => {
	if (!month) return `${year}`;
	return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
};

export default async function UpcomingInitiativesPage() {
	const initiatives = await getUpcomingInitiativesList();

	return (
		<>
			<Head>
				<title>WAWEF Upcoming Initiatives</title>
				<meta
					name="description"
					content="Upcoming initiatives and programs from WAWEF communities."
				/>
			</Head>

			<section className="w-full h-[20vh] sm:h-[26vh] lg:h-[34vh] bg-[#f5efe6] flex items-end">
				<div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
					<h1 className="text-3xl sm:text-5xl text-gray-900 font-bold tracking-tight">
						Upcoming Initiatives
					</h1>
					<p className="text-gray-700 text-sm sm:text-lg italic mt-2">
						Community changing initiatives coming soon.
					</p>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 pt-10 sm:pt-12">
				<p className="text-left pb-6 text-2xl sm:text-4xl">All Initiatives</p>

				<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{initiatives.map((initiative) => (
						<article
							key={initiative._id}
							className="rounded-sm overflow-hidden flex flex-col"
						>
							{initiative.backgroundType === "image" && initiative.backgroundImage ? (
								<div className="relative aspect-[4/3] overflow-hidden">
									<Image
										src={urlFor(initiative.backgroundImage)
											.width(800)
											.height(600)
											.fit("crop")
											.quality(85)
											.url()}
										alt={initiative.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
								</div>
							) : (
								<div
									className="aspect-[4/3] flex items-center justify-center"
									style={{ backgroundColor: initiative.initialBackgroundColor ?? "#E6E6E6" }}
									aria-label={`${initiative.title} initial`}
								>
									<span className="text-8xl font-bold text-[#2f2f2f]">
										{getInitials(initiative.title)}
									</span>
								</div>
							)}

							<div className="p-5 md:p-6 flex-grow flex flex-col">
								<h3 className="md:text-xl font-semibold text-gray-900 mb-1">
									{initiative.title}
								</h3>
								<p className="text-sm md:text-base text-[#6b5818] mb-3 italic">
									Launching {formatLaunchDate(initiative.launchMonth, initiative.launchYear)}
								</p>
								<p className="text-sm md:text-base leading-relaxed text-gray-700">
									{initiative.shortDescription}
								</p>
							</div>
						</article>
					))}
				</div>

				{initiatives.length === 0 && (
					<p className="text-center text-gray-500 py-12 text-lg">
						No upcoming initiatives yet. Check back soon!
					</p>
				)}
			</div>
		</>
	);
}

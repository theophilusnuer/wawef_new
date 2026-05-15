import Link from 'next/link';
import { getUpcomingInitiativesList } from '@/sanity/lib/getUpcomingInitiativesList';

const getInitials = (title: string) => {
	return title.trim().charAt(0).toUpperCase() || 'I';
};

const formatLaunchDate = (month: string | undefined, year: number) => {
	if (!month) return `${year}`;
	const monthLabel = month.charAt(0).toUpperCase() + month.slice(1);
	return `${monthLabel} ${year}`;
};

interface UpcomingInitiativesProps {
	showAll?: boolean;
}

export const UpcomingInitiatives = async ({ showAll = false }: UpcomingInitiativesProps) => {
	const initiatives = await getUpcomingInitiativesList();
	const visibleInitiatives = showAll ? initiatives : initiatives.slice(0, 3);
	const hasMoreInitiatives = initiatives.length > 3;

	const cardWidthClass =
		visibleInitiatives.length === 1
			? 'w-full'
			: visibleInitiatives.length === 2
				? 'w-full md:w-[calc(50%-0.75rem)]'
				: 'w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]';

	return (
		<section className="pt-5 pb-10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center lg:text-left">
					<h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
						Upcoming Initiative
						<span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
					</h2>
				</div>

				{initiatives.length > 0 ? (
					<>
						<div className="flex flex-wrap gap-6 md:pb-10">
							{visibleInitiatives.map((initiative) => {
								return (
									<article key={initiative._id} className={`${cardWidthClass} overflow-hidden flex flex-col`}>
										<div
											className="w-full h-48 md:h-56 flex items-center justify-center"
											style={{ backgroundColor: initiative.initialBackgroundColor }}
											aria-label={`${initiative.title} initial`}
										>
											<span className="text-6xl md:text-7xl font-bold text-[#2f2f2f]">
												{getInitials(initiative.title)}
											</span>
										</div>

										<div className="pt-4 px-1 flex flex-col">
											<h3 className="text-base md:text-xl font-semibold text-gray-800 mb-1">
												{initiative.title}
											</h3>
											<p className="text-sm md:text-base text-[#6b5818] mb-2 italic">
												Launching {formatLaunchDate(initiative.launchMonth, initiative.launchYear)}
											</p>
											<p className="text-sm md:text-base leading-relaxed">
												{initiative.shortDescription}
											</p>
										</div>
									</article>
								);
							})}
						</div>

						{hasMoreInitiatives && !showAll ? (
							<div className="flex justify-center">
								<Link
									href="/upcoming-initiatives"
									className="inline-block bg-[#F2C94C] px-6 py-3 rounded-sm text-sm md:text-base hover:scale-102 transition-all duration-200"
								>
									See all initiatives
								</Link>
							</div>
						) : null}
					</>
				) : (
					<div className="text-center p-6 bg-[#FAEBE7] rounded-sm">
						<p className="text-base md:text-lg text-gray-700">
							 Community Changing Initiatives coming soon! Stay tuned.
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

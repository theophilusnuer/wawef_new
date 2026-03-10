import { Quote3 } from './Quotes';
import { getProjectsList } from '@/sanity/lib/getProjectsList';
import ImpactNumbersCarousel from './ImpactNumbersCarousel';

const formatWithOrdinal = (day: number): string => {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return `${day}st`;
    if (j === 2 && k !== 12) return `${day}nd`;
    if (j === 3 && k !== 13) return `${day}rd`;
    return `${day}th`;
};

const formatLastUpdated = (isoDate?: string): string => {
    if (!isoDate) return 'N/A';

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return 'N/A';

    const day = formatWithOrdinal(date.getDate());
    const month = date.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export const ImpactNumbers = async () => {
    const projects = await getProjectsList();

    const totals = projects.reduce(
        (acc, project) => {
            const peopleImpacted = project.peopleImpacted ?? project.expectedPeopleImpacted ?? 0;
            const communitiesServed =
                project.communitiesImpacted ?? project.expectedCommunitiesImpacted ?? 0;

            return {
                totalPeopleImpacted: acc.totalPeopleImpacted + peopleImpacted,
                totalCommunitiesServed: acc.totalCommunitiesServed + communitiesServed,
            };
        },
        { totalPeopleImpacted: 0, totalCommunitiesServed: 0 },
    );

    const latestUpdatedAt = projects.reduce<string | undefined>((latest, project) => {
        if (!project._updatedAt) return latest;
        if (!latest) return project._updatedAt;
        return new Date(project._updatedAt).getTime() > new Date(latest).getTime()
            ? project._updatedAt
            : latest;
    }, undefined);

    return (
        <section className="py-10">
            <Quote3 />

            <div className="px-4 md:px-10 max-w-[78rem] mx-auto">
                <div className="rounded-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] bg-[#DDDDC6]">
                        <div className="px-5 py-5 text-center sm:text-left border-b md:border-b-0 md:border-r border-[#c7c4b2]">
                            <p className="text-xl md:text-3xl font-bold tracking-tight text-black">WAWEF IMPACTS</p>
                            <p className="text-sm md:text-base text-gray-700 mt-1">
                                last updated: {formatLastUpdated(latestUpdatedAt)}
                            </p>
                        </div>

                        <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-[#c7c4b2] text-center">
                            <p className="text-4xl md:text-6xl font-bold text-[#6b5818] leading-none">
                                {totals.totalPeopleImpacted.toLocaleString()}
                            </p>
                            <p className="text-sm md:text-base mt-2 text-gray-700">Lives impacted</p>
                        </div>

                        <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-[#c7c4b2] text-center">
                            <p className="text-4xl md:text-6xl font-bold text-[#6b5818] leading-none">
                                {projects.length.toLocaleString()}
                            </p>
                            <p className="text-sm md:text-base mt-2 text-gray-700">Projects</p>
                        </div>

                        <div className="px-4 py-4 text-center">
                            <p className="text-4xl md:text-6xl font-bold text-[#6b5818] leading-none">
                                {totals.totalCommunitiesServed.toLocaleString()}
                            </p>
                            <p className="text-sm md:text-base mt-2 text-gray-700">Communities Served</p>
                        </div>
                    </div>

                    <ImpactNumbersCarousel projects={projects} />
                </div>
            </div>
        </section>
    );
};

import { Quote3 } from './Quotes';
import { getImpactSummaryList } from '@/sanity/lib/getImpactSummaryList';

const cardBgColors = [
    'bg-[#FAEBE7]',
    'bg-transparent',
    'bg-[#F5F5DC]',
    'bg-transparent',
    'bg-[#DFF3E7] ',
    'bg-transparent',
];

export const ImpactNumbers = async () => {
    const impactItems = await getImpactSummaryList();

    return (
        <section className="py-12">
            <Quote3 />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
                        Impact Summary
                        <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
                    </h2>
                </div>

                {impactItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-0">
                        {impactItems.map((item, index) => (
                            <div
                                key={item._id}
                                className={`${cardBgColors[index % cardBgColors.length]} p-5`}
                            >
                                <h3 className="text-3xl font-bold mb-3">{item.impactNo}</h3>
                                <p className="text-base md:text-lg leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-[#FAEBE7] rounded-sm">
                        <p className="text-base md:text-lg text-gray-700">
                            No impact summary items available yet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

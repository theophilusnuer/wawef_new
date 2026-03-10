// src/components/ProblemSolution.tsx

import type { FullProject } from '@/sanity/lib/getProjectBySlug';

interface ProblemSolutionProps {
  project: FullProject;
}

export default function ProblemSolution({ project }: ProblemSolutionProps) {
  const isUpcoming = project.status === 'upcoming';

  // Select status-specific fields.
  const problemText = isUpcoming ? project.problem : project.completedProblem;
  const solutionText = isUpcoming ? project.solution : project.completedSolution;
  const objectivesApproach = isUpcoming ? project.objectivesApproach : project.completedObjectivesApproach;

  const hasSolutionText = Boolean(solutionText?.trim());
  const objectives = objectivesApproach?.objectives ?? [];
  const approachText = objectivesApproach?.approachText?.trim();
  const approachList = objectivesApproach?.approachList ?? [];

  const hasObjectives = objectives.length > 0;
  const hasApproachText = objectivesApproach?.approachType === 'text' && Boolean(approachText);
  const hasApproachList = objectivesApproach?.approachType === 'list' && approachList.length > 0;
  const hasApproach = hasApproachText || hasApproachList;
  const hasObjectivesApproach = hasObjectives || hasApproachText || hasApproachList;

  if (!problemText && !hasSolutionText && !hasObjectivesApproach) {
    return null;
  }

  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Problem – always centered */}
        {problemText && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 text-center">
              The Problem
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center whitespace-pre-line px-2 sm:px-0">
              {problemText}
            </p>
          </div>
        )}

        {/* Solution */}
        {(hasSolutionText || hasObjectivesApproach) && (
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 md:mb-10 text-center">
              Our Solution
            </h3>

            {hasSolutionText && (
              <div className="max-w-4xl mx-auto px-2 sm:px-4">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center whitespace-pre-line">
                  {solutionText}
                </p>
              </div>
            )}

            {hasObjectivesApproach && (
              <div
                className={`grid grid-cols-1 ${hasObjectives && hasApproach ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 sm:gap-8 lg:gap-12 ${hasSolutionText ? 'mt-10 md:mt-12' : ''}`}
              >
                {/* Objectives column */}
                {hasObjectives && (
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg sm:text-xl md:text-2xl text-center bg-[#FAEBE7] px-8 sm:px-12 md:px-20 py-2 md:py-3 rounded-sm mb-4 w-fit">
                      Objectives
                    </h4>

                    <ul className="w-full max-w-md sm:max-w-lg space-y-3 sm:space-y-4 text-base sm:text-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#e07a5f] rounded-br-sm rounded-bl-sm">
                      {objectives.map((obj: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#e07a5f] font-bold mr-3 mt-1 text-xl">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Approach column */}
                {hasApproach && (
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg sm:text-xl md:text-2xl text-center bg-[#F2C94C] px-8 sm:px-12 md:px-20 py-2 md:py-3 rounded-sm mb-4 w-fit">
                      Approach
                    </h4>

                    {hasApproachText ? (
                      <div className="w-full max-w-md sm:max-w-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm">
                        <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
                          {approachText}
                        </p>
                      </div>
                    ) : (
                      <ul className="w-full max-w-md sm:max-w-lg space-y-3 sm:space-y-4 text-base sm:text-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm">
                        {approachList.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#F2C94C] font-bold mr-3 mt-1 text-xl">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
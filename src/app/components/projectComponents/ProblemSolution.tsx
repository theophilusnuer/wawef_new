// src/components/ProblemSolution.tsx

import type { FullProject } from '@/sanity/lib/getProjectBySlug';

interface ProblemSolutionProps {
  project: FullProject;
}

export default function ProblemSolution({ project }: ProblemSolutionProps) {
  const isUpcoming = project.status === 'upcoming';

  // Select correct fields
  const problemText = isUpcoming ? project.problem : project.completedProblem;
  const solutionType = isUpcoming ? project.solutionType : project.completedSolutionType;
  const solutionText = isUpcoming ? project.solution : project.completedSolution;
  const objectivesApproach = isUpcoming ? project.objectivesApproach : project.completedObjectivesApproach;

  if (!problemText && !solutionType) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Problem – always centered */}
        {problemText && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5 text-center">
              The Problem
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center whitespace-pre-line px-2 sm:px-0">
              {problemText}
            </p>
          </div>
        )}

        {/* Solution */}
        {(solutionType || objectivesApproach) && (
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-8 md:mb-10 text-center">
              Our Solution
            </h3>

            {solutionType === 'paragraph' && solutionText ? (
              // Single paragraph – centered
              <div className="max-w-4xl mx-auto px-2 sm:px-4">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center whitespace-pre-line">
                  {solutionText}
                </p>
              </div>
            ) : (
              // Objectives + Approach – responsive columns
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Objectives column */}
                <div className="flex flex-col items-center min-h-[320px] sm:min-h-[380px]">
                  <h4 className="text-lg sm:text-xl md:text-2xl text-center bg-[#FAEBE7] px-8 sm:px-12 md:px-20 py-2 md:py-3 rounded-sm mb-4 w-fit">
                    Objectives
                  </h4>

                  {objectivesApproach?.objectives && objectivesApproach.objectives.length > 0 ? (
                    <ul className="w-full max-w-md sm:max-w-lg space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#e07a5f] rounded-br-sm rounded-bl-sm">
                      {objectivesApproach.objectives.map((obj, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#e07a5f] font-bold mr-3 mt-1 text-xl">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic text-center mt-4">
                      No objectives listed.
                    </p>
                  )}
                </div>

                {/* Approach column */}
                <div className="flex flex-col items-center min-h-[320px] sm:min-h-[380px]">
                  <h4 className="text-lg sm:text-xl md:text-2xl text-center bg-[#F2C94C] px-8 sm:px-12 md:px-20 py-2 md:py-3 rounded-sm mb-4 w-fit">
                    Approach
                  </h4>

                  {objectivesApproach?.approachType === 'text' && objectivesApproach.approachText ? (
                    <div className="w-full max-w-md sm:max-w-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                        {objectivesApproach.approachText}
                      </p>
                    </div>
                  ) : objectivesApproach?.approachType === 'list' && objectivesApproach.approachList?.length ? (
                    <ul className="w-full max-w-md sm:max-w-lg space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-lg px-4 sm:px-6 py-5 sm:py-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm">
                      {objectivesApproach.approachList.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#F2C94C] font-bold mr-3 mt-1 text-xl">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic text-center mt-4">
                      No approach details available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
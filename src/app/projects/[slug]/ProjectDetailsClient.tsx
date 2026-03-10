// src/app/projects/[slug]/ProjectDetailsClient.tsx

'use client';

import React from 'react';
import type { FullProject } from '@/sanity/lib/getProjectBySlug';
import ProjectHero from '@/app/components/projectComponents/ProjectHero';
import ProblemSolution from '@/app/components/projectComponents/ProblemSolution';
import { SponsorProject } from '@/app/components/projectComponents/SponsorProject';
import ProjectOverview from '@/app/components/projectComponents/ProjectOverview';
import ProjectGallery from '@/app/components/projectComponents/ProjectGallery';
import ProjectSponsorsDonors from '@/app/components/projectComponents/ProjectSponsorsDonors';

interface ProjectDetailsClientProps {
  project: FullProject;
}

const ProjectDetailsClient: React.FC<ProjectDetailsClientProps> = ({ project }) => {
  return (
    <div className="">
      <ProjectHero project={project} />
      <ProblemSolution project={project} />

      {/* Conditional: Sponsor for upcoming, Overview for completed */}
      {project.status === 'upcoming' ? (
        <>
          <SponsorProject project={project} />
          <ProjectSponsorsDonors project={project} />
        </>
      ) : (
        <>
          <ProjectOverview project={project} />
          <ProjectSponsorsDonors project={project} />
          <ProjectGallery project={project} />
        </>
      )}

    </div>
  );
};

export default ProjectDetailsClient;
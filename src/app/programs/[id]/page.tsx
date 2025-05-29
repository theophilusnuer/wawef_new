import React from 'react';
import { programsData } from '@/app/components/programs/programsData';
import { notFound } from 'next/navigation';
import ProgramDetailsClient from './ProgramDetailsClient';
import { generateProgramSlug, getProgramPath } from '@/app/utils/slugUtils';

interface Program {
  title: string;
}

export default async function ProgramDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const program = programsData.find(
    (p) => generateProgramSlug(p.title) === id
  );

  if (!program) {
    notFound();
    return null;
  }

  const otherPrograms = programsData
    .filter((p) => p.title !== program.title)
    .map((p) => ({
      title: p.title,
      href: getProgramPath(p.title),
    }));

  return (
    <ProgramDetailsClient
      program={program}
      otherPrograms={otherPrograms}
    />
  );
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return programsData.map((program) => ({
    id: generateProgramSlug(program.title),
  }));
}

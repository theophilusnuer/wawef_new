"use client";

import React from "react";
import type { FullProgram } from "@/sanity/lib/getProgramBySlug";
import ProgramHero from "@/app/components/programComponents/ProgramHero";
import ProgramDetails from "@/app/components/programComponents/ProgramDetails";
import ProgramGallery from "@/app/components/programComponents/ProgramGallery";

interface ProgramDetailsClientProps {
	program: FullProgram;
}

const ProgramDetailsClient: React.FC<ProgramDetailsClientProps> = ({ program }) => {
	return (
		<div className="bg-[#FCFCF4] min-h-screen">
			<ProgramHero program={program} />
			<ProgramDetails program={program} />
			<ProgramGallery program={program} />
		</div>
	);
};

export default ProgramDetailsClient;

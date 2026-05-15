import { notFound } from "next/navigation";
import { getProgramBySlug } from "@/sanity/lib/getProgramBySlug";
import ProgramDetailsClient from "./ProgramDetailsClient";

interface ProgramPageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
	const resolvedParams = await params;
	const { slug } = resolvedParams;
	const program = await getProgramBySlug(slug);

	if (!program) {
		notFound();
		return null;
	}

	return <ProgramDetailsClient program={program} />;
}
